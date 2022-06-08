using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class UserAgent
    {
        public int Id { get; set; }
        public string BrowserType { get; set; } = null!;
        public string UserAgent1 { get; set; } = null!;
        public int NumberOfRep { get; set; }
    }
}
