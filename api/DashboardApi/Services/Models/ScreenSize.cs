using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class ScreenSize
    {
        public int Id { get; set; }
        public string BrowserType { get; set; } = null!;
        public int Width { get; set; }
        public int Height { get; set; }
        public int NumberOfRep { get; set; }
    }
}
