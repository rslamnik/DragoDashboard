using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Interfaces;
using Services.Models;

namespace DashboardApi.Controllers
{
    public class MonitorController : Controller
    {
        private readonly IMonitorService _monitorService;

        public MonitorController(IMonitorService monitorService)
        {
            _monitorService = monitorService;
        }

        [HttpGet("machines")]
        public async Task<ActionResult<List<MachineDto>>> GetMachines(CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.GetMachines(cancellationToken));
        }

        [HttpGet("machines/{id}")]
        public async Task<ActionResult<List<MachineDto>>> GetMachine(int id, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.GetMachine(id, cancellationToken));
        }

        [HttpGet("proxies")]
        public async Task<ActionResult<List<ProxyDto>>> GetProxies(CancellationToken cancellationToken = default)
        {
            var a = Request.Headers;
            return Ok(await _monitorService.GetProxies(cancellationToken));
        }

        [HttpPost("proxies")]
        public async Task<ActionResult<int>> CreateProxy([FromBody] ProxyDto request, CancellationToken cancellationToken = default)
        {
            return Created("", await _monitorService.AddProxy(request, cancellationToken));
        }

        [HttpPut("proxies/{id}")]
        public async Task<ActionResult<int>> UpdateProxy([FromBody] ProxyDto proxy, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.UpdateProxy(proxy, cancellationToken));
        }

        [HttpDelete("proxies/{id}")]
        public async Task<ActionResult<int>> DeleteProxy(int id, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.DeleteProxy(id, cancellationToken));
        }

        [HttpGet("proxies/{id}")]
        public async Task<ActionResult<ProxyDto>> GetProxy(int id, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.GetProxy(id, cancellationToken));
        }

        [HttpGet("channels")]
        public async Task<ActionResult<List<ChannelDto>>> GetChannels(CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.GetChannels(cancellationToken));
        }

        [HttpGet("channels/{id}")]
        public async Task<ActionResult<ChannelDto>> GetChannel(int id, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.GetChannel(id, cancellationToken));
        }

        [HttpPost("channels")]
        public async Task<ActionResult<int>> CreateChannel([FromBody] ChannelDto request, CancellationToken cancellationToken = default)
        {
            return Created("", await _monitorService.AddChannel(request, cancellationToken));
        }

        [HttpPut("channels/{id}")]
        public async Task<ActionResult<int>> UpdateChannel([FromBody] ChannelDto channel, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.UpdateChannel(channel, cancellationToken));
        }

        [HttpDelete("channels/{id}")]
        public async Task<ActionResult<int>> DeleteChannel(int id, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.DeleteChannel(id, cancellationToken));
        }

        [HttpPost("keywords/categories")]
        public async Task<ActionResult<int>> CreateKeywordCategory([FromBody] KeywordCategory request, CancellationToken cancellationToken = default)
        {
            return Created("", await _monitorService.AddKeywordCategory(request, cancellationToken));
        }

        [HttpGet("keywords/categories")]
        public async Task<ActionResult<List<ChannelDto>>> GetKeywordCategories(CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.GetKeywordCategories(cancellationToken));
        }

        [HttpGet("keywords/categories/{id}")]
        public async Task<ActionResult<KeywordCategory>> GetKeywordCategory(int id, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.GetKeywordCategory(id, cancellationToken));
        }

        [HttpPut("keywords/categories/{id}")]
        public async Task<ActionResult<int>> UpdateKeywordCategory([FromBody] KeywordCategory keywordCategory, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.UpdateKeywordCategory(keywordCategory, cancellationToken));
        }

        [HttpDelete("keywords/categories/{id}")]
        public async Task<ActionResult<int>> DeleteKeywordCategory(int id, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.DeleteKeyword(id, cancellationToken));
        }

        [HttpGet("keywords/category/{categoryId}")]
        public async Task<ActionResult<List<KeywordV2>>> GetKeywords(int categoryId, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.GetKeywords(categoryId, cancellationToken));
        }

        [HttpGet("keywords/{id}")]
        public async Task<ActionResult<KeywordV2>> GetKeyword(int id, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.GetKeyword(id, cancellationToken));
        }

        [HttpPost("keywords")]
        public async Task<ActionResult<int>> CreateKeyword([FromBody] KeywordV2 request, CancellationToken cancellationToken = default)
        {
            return Created("", await _monitorService.AddKeyword(request, cancellationToken));
        }

        [HttpDelete("keywords/{id}")]
        public async Task<ActionResult<int>> DeleteKeyword(int id, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.DeleteKeyword(id, cancellationToken));
        }

        [HttpPut("keywords/{id}")]
        public async Task<ActionResult<int>> UpdateKeyword([FromBody] KeywordV2 keyword, CancellationToken cancellationToken = default)
        {
            return Ok(await _monitorService.UpdateKeyword(keyword, cancellationToken));
        }
    }
}
