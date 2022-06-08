using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Dto
{
    public class MachineDto
    {
        public int Id { get; set; }
        public string MachineName { get; set; }
        public bool IsOnline { get; set; }
        public string BaseUrl { get; set; }
        public int SlowMotionFrom { get; set; }
        public int SlowMotionTo { get; set; }

        public int DegreeOfParallelism { get; set; }
        public string Nation { get; set; }
        public string Note { get; set; }
        public Nullable<bool> InternalUse { get; set; }
        public string BotName { get; set; }

        public ProxyDto Proxy { get; set; }
        public List<ChannelDto> Channels { get; set; }
    }
}
