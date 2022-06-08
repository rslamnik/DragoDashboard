using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class ArchNotInUseMachine
    {
        public int Id { get; set; }
        public string MachineName { get; set; } = null!;
        public string BaseUrl { get; set; } = null!;
        public int SlowMotionFrom { get; set; }
        public int SlowMotionTo { get; set; }
        public int DegreeOfParallelism { get; set; }
        public string? Nation { get; set; }
        public string? Note { get; set; }
        public bool? InternalUse { get; set; }
        public string? BotName { get; set; }
    }
}
