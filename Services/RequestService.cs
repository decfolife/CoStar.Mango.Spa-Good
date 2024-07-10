using System;

namespace MangoSPA.Services;

public interface IRequestService
{
    public Guid TrackingId { get; }
}

public class RequestService: IRequestService
{
    public Guid TrackingId { get; }

    public RequestService(Guid trackingId)
    {
        TrackingId = trackingId;
    }
}
