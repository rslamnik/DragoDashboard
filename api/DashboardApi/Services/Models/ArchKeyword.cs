﻿using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class ArchKeyword
    {
        public int Id { get; set; }
        public string Keyword { get; set; } = null!;
        public string Nation { get; set; } = null!;
        public bool Active { get; set; }
        public int NumberOfRep { get; set; }
        public DateTime? Date { get; set; }
        public bool? Organic { get; set; }
        public int? NumberOfRep2 { get; set; }
    }
}
