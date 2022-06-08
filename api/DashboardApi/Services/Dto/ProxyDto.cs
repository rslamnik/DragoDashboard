using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Dto
{
    public class ProxyDto
    {
        public int Id { get; set; }
        public string ProxyName { get; set; }
        public string Nation { get; set; }
        public string ProxyServer { get; set; }
        public string ProxyUsername { get; set; }
        public string ProxyPassword { get; set; }
        public int NumOfRep { get; set; }
    }
}
