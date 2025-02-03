import { UtilityService } from './utility.service';
import {
  IADCardData,
  localCardConfig,
  testResults,
  paramStart,
  mergeArrayData1,
  mergeArrayData2,
  mergeArraysResult,
} from '@mango/data-models/mocks';

describe('UtilityService - mergeArrayOfObjects', () => {
  let service: UtilityService;

  beforeEach(() => {
    service = new UtilityService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Testing mergeArraysOfObjects
   */
  it('should merge arrays using PeriodYear to DueByYear', () => {
    const result = service.mergeArraysOfObjects(
      mergeArrayData1,
      mergeArrayData2
    );

    expect(result.length).toBe(2);

    expect(result).toEqual(mergeArraysResult);
  });

  it('should handle empty arrays', () => {
    expect(service.mergeArraysOfObjects([], [])).toEqual([]);
    expect(service.mergeArraysOfObjects(mergeArrayData1, [])).toEqual(
      mergeArrayData1
    );
    expect(service.mergeArraysOfObjects([], mergeArrayData2)).toEqual(
      mergeArrayData2
    );
  });

  /**
   * Testing mapFields: Using fieldTransform map the local IADCardData and the API response
   */
  it('should return transformed store using IADCardData', () => {
    const result = service.mapFieldsPivotGrid(
      IADCardData[0],
      localCardConfig.localCardConfig[0],
      paramStart
    );

    expect(result.length).toBe(96);

    expect(result).toStrictEqual(testResults.leaseCostMap);
  });

  /**
   * Testing filterByKey
   */
  it('should Filter cardData given a numeric key to compare against', () => {
    const result = service.filterByKey(
      IADCardData[8],
      paramStart,
      paramStart + 5
    );

    expect(result.length).toBe(5);

    expect(result).toStrictEqual(testResults.futureCommitmentsFilter);
  });

  /**
   * Testing findObjectByID
   */
  it("should find the index of a card given it's id and a list of cards", () => {
    const result = service.findObjectByID(
      localCardConfig.localCardConfig,
      localCardConfig.localCardConfig[7].id
    );
    expect(result).toBe(7);
  });
});
