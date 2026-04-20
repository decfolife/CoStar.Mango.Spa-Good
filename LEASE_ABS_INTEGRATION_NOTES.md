# Lease Abstraction Integration Notes

## Summary

This document captures the remaining work and decisions needed to make the UI and backend work cleanly with the new `lease-abs-api` integration.

The current direction is:

- keep one parent abstraction row per lease package
- keep many child document rows under that abstraction
- store per-document external request/result metadata on the child rows
- store one final parent `AIOutputJson` on the abstraction row for the existing form/review UI

This preserves the current Angular contract:

- one `aiAbstractionId`
- one `GetAiAbstractionById`
- one `aiOutputJson`

## Key Architecture Decision

### Lease Package vs Document Result

Multiple uploaded files belong to one lease package.

That means the correct product unit is still:

- one abstraction per lease package

Not:

- one abstraction per uploaded file

The external abstraction pipeline appears to return results per request/document. That is not the same as the package-level result needed by the current FormsEngine UI.

So there are two different result levels:

- document-level AI output
- package-level final abstraction output

The package-level final output is what the form should use.

## What VL Appears To Do

From the traced VL code path:

- VL tracks job status and request status in backend code
- VL downloads abstraction result JSON per `requestId`
- VL stores that JSON back as an attachment on the corresponding document
- VL uses that single request/document result in downstream processing

What was not found:

- a package-level merge of several document JSON results into one final abstraction output

So VL is useful as a reference for:

- auth to the abstraction platform
- job/request tracking
- result download
- persistence of result artifacts

But it does not appear to solve the lease-package consolidation problem for us.

## What The New Docs Confirm

The three new PDFs confirm the external contract is request-centric.

### Confirmed By API Documentation

From `RVAD-API`:

- `POST /abstraction` submits one or many document request objects and returns a `JobId`
- `GET /abstraction/job-details/{jobId}` returns the requests/documents linked to that job
- `GET /abstraction/request-details` returns details for one or more `RequestIds`
- `GET /abstraction/files/{requestId}/download?attachmentTypeId=...` returns a file artifact for a single request

The attachment type list explicitly documents:

- `60 = ABSTRACTION_RESULT_JSON`

That means the final abstraction JSON is retrieved per `requestId`, not per lease package.

### Confirmed By Integration Design

From `CoStar Integration Tech Design`:

- `DocGroupId` is intended to indicate a group of documents belonging to the same lease
- `ExternalReferenceId` is generated per outgoing request object so the source system can map the external `RequestId` back to its own row
- polling returns request-level statuses
- when a request completes, the consumer calls request-detail / request-document APIs to fetch that document's abstraction results and OCR output

So the external platform gives us:

- one job for a batch submission
- one request per document
- one abstraction result per request/document
- one `DocGroupId` only as a grouping hint

It does not document a package-level merged abstraction result.

### Confirmed By Integration Checklist

From `Integration Clients and Checklists`:

- bulk exports submit documents, record the `JobId`, and then check job status
- fetching abstraction results is described as request-detail / request-document activity
- the checklist calls out that this request-level retrieval is mainly needed for user-driven abstraction flows, not bulk export status monitoring

This matches the API design and the VL implementation pattern.

## Current FormsEngine Direction

The integration work that was added follows this shape:

- create one parent abstraction row
- save uploaded files as child document rows
- send files to `lease-abs-api`
- persist external job metadata on the parent row
- persist external request/result metadata on child rows
- download result JSON from `lease-abs-api`
- save child document result JSON
- derive one final parent `AIOutputJson`

The weak point in the current implementation is the package-level consolidation rule.

Right now the behavior is effectively a compatibility placeholder:

- the first successful child document result can become the parent `AIOutputJson`

That is enough to keep the current UI contract alive, but it is not a final business rule for multi-file lease packages.

## Updated Design Implication

The current parent-row model is still the right structure for FormsEngine, but the external API is not going to hand us a finished package-level `IAIOutput`.

So FormsEngine must do one of these on purpose:

- define how to derive one package-level result from several child request results
- or change the UI/backend contract so the form no longer depends on one parent `AIOutputJson`

Given the current Mango UI contract, the practical choice is still:

- keep one parent abstraction row for the lease package
- keep many child document rows for the external requests
- explicitly define how the parent output is chosen or composed

The key point is that `DocGroupId` links related documents, but it does not replace package-level consolidation logic in FormsEngine.

## Recommended Package-Level Strategy

### Do Not Switch To Multiple Parent Rows

Do not move to:

- one abstraction row per document

Because the user review experience is still one lease package.

### Do Not Do A Blind Full Merge

Do not blindly merge all document JSON values into one output without precedence rules.

That is too risky and likely to create conflicting field values.

### Recommended First Version

Use a controlled package-level consolidation rule:

1. Choose one primary document result as the base output.
2. Store all other child document outputs for traceability.
3. Allow supporting documents to backfill only missing fields.
4. Do not overwrite already-populated parent fields until explicit precedence rules exist.

This keeps:

- one parent abstraction row
- one final form-driving `AIOutputJson`
- all child document outputs available for debugging and future improvements

## What Is Left To Do

### FormsEngine

1. Run the SQL script against the client database.

Relevant file:

- [AI Lease Scripts.sql](/Users/michaelcurtis/developer/formsengine/AI%20Lease%20Scripts.sql:1)

2. Configure the `LeaseAbstractionApi` settings.

Relevant file:

- [appsettings.json](/Users/michaelcurtis/developer/formsengine/FormsEngine.API/appsettings.json:1)

Required settings:

- `LeaseAbstractionApi:BaseUrl`
- `LeaseAbstractionApi:PollIntervalSeconds`
- `LeaseAbstractionApi:MaxPollAttempts`
- `LeaseAbstractionApi:ApiKeyHeaderName`
- `LeaseAbstractionApi:ApiKey`
- `LeaseAbstractionApi:AuthorizationScheme`
- `LeaseAbstractionApi:AuthorizationToken`
- `LeaseAbstractionApi:ResultAttachmentTypeId`
- `LeaseAbstractionApi:AwsRegion`
- `LeaseAbstractionApi:KmsKeyId`

3. Validate that FormsEngine can authenticate to `lease-abs-api` in the real environment.

Important auth note:

- FormsEngine inbound auth and `lease-abs-api` outbound auth are separate concerns
- the FormsEngine user bearer token should not be forwarded to `lease-abs-api`
- for development, `lease-abs-api` can be called with a configured API key header
- the current FormsEngine branch has been updated to use `LeaseAbstractionApi` config for outbound auth instead of forwarding `Request.Headers.Authorization`

4. Validate that encrypted result downloads can be decrypted in the real environment.

5. Replace the current placeholder package-output rule with an explicit package consolidation rule.

This is now confirmed by the docs, not just inferred from code inspection.

6. Confirm how the parent `AIOutputJson` should be built when:

- one child request fails
- several child requests succeed
- no child request returns usable abstraction JSON

7. Decide whether child document rows should track document role or classification, for example:

- `PrimaryLease`
- `Amendment`
- `Exhibit`
- `Other`

That would support better package-level precedence later.

8. Improve background processing durability.

Current risk:

- abstraction processing is initiated with in-process fire-and-forget work
- if the app restarts, the in-flight abstraction may be lost or left incomplete

Longer-term options:

- durable background queue
- scheduled recovery job that resumes unfinished abstractions from DB state

9. Validate the error/status model returned to the UI.

The UI should behave correctly for:

- `Pending`
- `Processing`
- `Complete`
- `Error`

### CoStar.Mango.Spa

1. Verify the current abstraction detail flow still works unchanged:

- create abstraction
- poll `GetAiAbstractionById`
- parse parent `aiOutputJson`
- render the form

2. Verify the document viewer and AI sidebar still make sense for a parent abstraction with many child documents.

3. Decide whether the UI should surface any of the new external metadata:

- external job status
- external request ids
- per-document external status
- per-document child output availability

4. Decide whether users need visibility into child document results or whether only the final parent abstraction should be visible.

The current UI does not need to change if the parent `AIOutputJson` remains the form-driving contract.

### Integration / Validation

Run these scenarios end-to-end:

1. Single-document abstraction

- upload one PDF
- confirm abstraction completes
- confirm parent `AIOutputJson` is populated
- confirm form renders

2. Multi-document lease package

- upload multiple files belonging to one package
- confirm all child documents are tracked
- confirm external request metadata is saved
- confirm one parent `AIOutputJson` is produced
- confirm the form renders from the parent result

3. Partial failure

- one child request succeeds
- one child request fails
- verify parent status and user-visible behavior are acceptable

4. No usable result

- no child result is usable
- verify the parent abstraction enters an understandable error state

5. Restart / recycle behavior

- submit an abstraction
- restart FormsEngine before completion
- verify whether recovery exists or whether the abstraction becomes stuck

6. Real environment decryption and auth

- confirm the result-download path works outside local assumptions

## Suggested Next Implementation Step

The next most important change is not UI work. It is package-level consolidation logic.

Suggested first implementation:

1. Keep storing raw child outputs on `tblAiAbstractionDocuments`.
2. Choose one base child result for the package.
3. Build parent `AIOutputJson` from that base result.
4. Optionally backfill missing fields from other child results.
5. Keep conflict resolution out of scope until there is a clear business rule.

## Recommended Decision To Make Next

We should decide the package-level rule before adding more UI behavior.

The cleanest first decision is:

1. Pick how the primary document in a lease package is identified.
2. Use that document's abstraction result as the parent `AIOutputJson`.
3. Treat other documents as supporting documents that can only backfill missing parent fields.
4. Keep every child request/result stored separately for audit and later iteration.

Without that rule, the system will continue to work technically, but the parent form data for multi-document packages will remain arbitrary.

## Branches Created For This Work

### Client Repo

- branch: `feature/ai-lease-client-contract`
- commit: `6e4645ae6`

### FormsEngine Repo

- branch: `feature/ai-lease-abs-integration`
- commit: `ec8ce8b`

## Relevant Files

### Client

- [ai-lease.service.ts](/Users/michaelcurtis/developer/CoStar.Mango.Spa/Client/libs/forms-shared/src/lib/ai/services/ai-lease.service.ts:1)

### FormsEngine

- [AiAbstractionService.cs](/Users/michaelcurtis/developer/formsengine/FormsEngine.Application/Ai/AiAbstractionService.cs:1)
- [AiAbstractionRepository.cs](/Users/michaelcurtis/developer/formsengine/FormsEngine.Application/Ai/AiAbstractionRepository.cs:1)
- [LeaseAbstractionPipelineService.cs](/Users/michaelcurtis/developer/formsengine/FormsEngine.Application/Ai/LeaseAbstractionPipelineService.cs:1)
- [CreateAiAbstractionCommand.cs](/Users/michaelcurtis/developer/formsengine/FormsEngine.Application/Ai/Commands/CreateAiAbstractionCommand.cs:1)
- [AiAbstractionsController.cs](/Users/michaelcurtis/developer/formsengine/FormsEngine.API/Controllers/AiAbstractionsController.cs:1)
- [appsettings.json](/Users/michaelcurtis/developer/formsengine/FormsEngine.API/appsettings.json:1)
- [AI Lease Scripts.sql](/Users/michaelcurtis/developer/formsengine/AI%20Lease%20Scripts.sql:1)

## Bottom Line

The external abstraction platform appears to be document/request-centric.

Our product is lease-package-centric.

So the remaining work is to make FormsEngine act as the package-level consolidation layer while preserving the current UI contract of:

- one abstraction row
- one final `AIOutputJson`
- one form/review experience
