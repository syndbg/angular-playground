describe('Time Ago filter ', function() {
  beforeEach(module('filtersApp'));

  var filter, mockTime;


  beforeEach(inject(function(timeAgoFilter) {
    filter = timeAgoFilter;
  }));


  describe('Without optional argument', function() {
    it('should respond with seconds ago', function() {
      mockTime = new Date().getTime();
      expect(filter(mockTime)).toEqual('seconds ago');
    });

    it('should respond with minutes ago', function() {
      mockTime = new Date().getTime() - 1000 * 60;
      expect(filter(mockTime)).toEqual('minutes ago');
    });

    it('should respond with hours ago', function() {
      mockTime = new Date().getTime() - 1000 * 60 * 60;
      expect(filter(mockTime)).toEqual('hours ago');
    });

    it('should respond with weeks ago', function() {
      mockTime = new Date().getTime() - 1000 * 60 * 60 * 24;
      expect(filter(mockTime)).toEqual('weeks ago');
    });

    it('should respond with months ago', function() {
      mockTime = new Date().getTime() - 1000 * 60 * 60 * 24 * 31;
      expect(filter(mockTime)).toEqual('months ago');
    });
  });

  describe('With optional argument - optShowSeconds', function() {
    it('showSeconds should default to true', function() {
      mockTime = new Date().getTime();
      expect(filter(mockTime)).toEqual('seconds ago');
    });

    it('should respond with seconds ago', function() {
      mockTime = new Date().getTime();
      expect(filter(mockTime, false)).toEqual('minutes ago');
    });

    it('should respond with minutes ago if optShowSeconds is false', function() {
      mockTime = new Date().getTime() - 1000 * 60;
      expect(filter(mockTime, false)).toEqual('minutes ago');
    });

    it('should respond with hours ago if optShowSeconds is false', function() {
      mockTime = new Date().getTime() - 1000 * 60 * 60;
      expect(filter(mockTime, false)).toEqual('hours ago');
    });

    it('should respond with weeks ago if optShowSeconds is false', function() {
      mockTime = new Date().getTime() - 1000 * 60 * 60 * 24;
      expect(filter(mockTime, false)).toEqual('weeks ago');
    });

    it('should respond with months ago if optShowSeconds is false', function() {
      mockTime = new Date().getTime() - 1000 * 60 * 60 * 24 * 31;
      expect(filter(mockTime, false)).toEqual('months ago');
    });
  });
});
