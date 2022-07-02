using Services.Dto;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IMonitorService
    {
        Task<List<MachineDto>> GetMachines(CancellationToken cancellationToken = default);
        Task<MachineDto> GetMachine(int id, CancellationToken cancellationToken = default);
        Task<List<ProxyDto>> GetProxies(CancellationToken cancellationToken = default);
        Task<ProxyDto> GetProxy(int proxyId, CancellationToken cancellationToken = default);
        Task<int> AddProxy(ProxyDto proxy, CancellationToken cancellationToken = default);
        Task<int> UpdateProxy(ProxyDto proxy, CancellationToken cancellationToken = default);
        Task<int> DeleteProxy(int proxyId, CancellationToken cancellationToken = default);
        Task<List<ChannelDto>> GetChannels(CancellationToken cancellationToken = default);
        Task<ChannelDto> GetChannel(int channelId, CancellationToken cancellationToken = default);
        Task<int> AddChannel(ChannelDto channel, CancellationToken cancellationToken = default);
        Task<int> UpdateChannel(ChannelDto channel, CancellationToken cancellationToken = default);
        Task<int> DeleteChannel(int channelId, CancellationToken cancellationToken = default);
        Task<List<KeywordCategory>> GetKeywordCategories(CancellationToken cancellationToken = default);
        Task<int> AddKeywordCategory(KeywordCategory proxy, CancellationToken cancellationToken = default);
        Task<KeywordCategory> GetKeywordCategory(int keywordCategoryId, CancellationToken cancellationToken = default);
        Task<int> UpdateKeywordCategory(KeywordCategory keywordCategory, CancellationToken cancellationToken = default);
        Task<List<KeywordV2>> GetKeywords(int keywordCategoryId, CancellationToken cancellationToken = default);
        Task<KeywordV2> GetKeyword(int id, CancellationToken cancellationToken = default);
        Task<int> AddKeyword(KeywordV2 keyword, CancellationToken cancellationToken = default);
        Task<int> DeleteKeyword(int keywordId, CancellationToken cancellationToken = default);
        Task<int> UpdateKeyword(KeywordV2 keyword, CancellationToken cancellationToken = default);
        Task<int> DeleteKeywordCategory(int keywordCategoryId, CancellationToken cancellationToken = default);
        Task<int> AddBulkKeywords(List<KeywordV2> keywords, CancellationToken cancellationToken = default);
    }
}
