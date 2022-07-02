using Microsoft.EntityFrameworkCore;
using Services.Dto;
using Services.Interfaces;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monitor = Services.Models.Monitor;

namespace Services
{
    public class MonitorService : IMonitorService
    {
        public Task<int> AddProxy(ProxyDto proxy, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var p = new Proxy
                {
                    ProxyName = proxy.ProxyName,
                    ProxyServer = proxy.ProxyServer,
                    ProxyUsername = proxy.ProxyUsername,
                    ProxyPassword = proxy.ProxyPassword,
                };
                db.Proxies.Add(p);
                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<int> UpdateProxy(ProxyDto proxy, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var p = db.Proxies.First(x => x.ProxyId == proxy.Id);
                p.ProxyName = proxy.ProxyName;
                p.ProxyServer = proxy.ProxyServer;
                p.ProxyUsername = proxy.ProxyUsername;
                p.ProxyPassword = proxy.ProxyPassword;

                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<int> DeleteProxy(int proxyId, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var p = db.Proxies.First(x => x.ProxyId == proxyId);
                db.Proxies.Remove(p);

                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<ProxyDto> GetProxy(int proxyId, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var p = db.Proxies.First(x => x.ProxyId == proxyId);
                return Task.FromResult(new ProxyDto
                {
                    Id = p.ProxyId,
                    ProxyName = p.ProxyName,
                    ProxyServer = p.ProxyServer,
                    ProxyUsername = p.ProxyUsername,
                    ProxyPassword = p.ProxyPassword
                });
            }
        }

        public Task<MachineDto> GetMachine(int id, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var connection = db.Database.GetDbConnection();

                // Open the connection if isn't open
                if (connection.State != System.Data.ConnectionState.Open)
                    connection.Open();

                var result = new MachineDto();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = String.Format("exec [dbo].[ds_Get_Machine_By_Id] @MachineId = {0}", id);
                    command.Connection = connection;
                    using (var dataReader = command.ExecuteReader())
                    {
                        // Machine
                        if (dataReader.HasRows)
                        {
                            while (dataReader.Read())
                            {

                                result = new MachineDto()
                                {
                                    Id = dataReader.GetInt32(0),
                                    MachineName = dataReader.GetString(1),
                                    BaseUrl = dataReader.GetString(2),
                                    SlowMotionFrom = dataReader.GetInt32(3),
                                    SlowMotionTo = dataReader.GetInt32(4),
                                    DegreeOfParallelism = dataReader.GetInt32(5),
                                    Nation = dataReader.IsDBNull(6) ? "" : dataReader.GetString(6),
                                    Note = dataReader.IsDBNull(7) ? "" : dataReader.GetString(7),
                                    InternalUse = dataReader.IsDBNull(8) ? null : dataReader.GetBoolean(8),
                                    BotName = dataReader.IsDBNull(9) ? "" : dataReader.GetString(9)
                                };
                            }
                        }

                        dataReader.NextResult();

                        // Proxy
                        if (dataReader.HasRows)
                        {
                            while (dataReader.Read())
                            {
                                var proxy = new ProxyDto()
                                {
                                    Id = dataReader.GetInt32(0),
                                    ProxyName = dataReader.GetString(1),
                                    Nation = dataReader.GetString(2),
                                    ProxyServer = dataReader.GetString(3),
                                    ProxyUsername = dataReader.GetString(4),
                                    ProxyPassword = dataReader.GetString(5),
                                    NumOfRep = dataReader.GetInt32(6)
                                };

                                result.Proxy = proxy;
                            }
                        }

                        dataReader.NextResult();

                        // Channel
                        if (dataReader.HasRows)
                        {
                            result.Channels = new List<ChannelDto>();

                            while (dataReader.Read())
                            {
                                var channel = new ChannelDto()
                                {
                                    Id = dataReader.GetInt32(0),
                                    ChannelName = dataReader.GetString(1),
                                    ChannelDescription = dataReader.IsDBNull(2) ? "" : dataReader.GetString(2),
                                    Active = dataReader.GetBoolean(3),
                                    NumberOfRep = dataReader.GetInt32(4),
                                    NumberOfAds = dataReader.GetInt32(5),
                                    AdsPercentage = dataReader.GetInt32(6),
                                    Nation = dataReader.GetString(7),
                                    KeywordCategoryId = dataReader.GetInt32(8),
                                    CategoryName = dataReader.GetString(9)
                                };

                                result.Channels.Add(channel);
                            }
                        }
                    }
                }

                return Task.FromResult(result);
            }
        }

        public Task<List<MachineDto>> GetMachines(CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var connection = db.Database.GetDbConnection();

                // Open the connection if isn't open
                if (connection.State != System.Data.ConnectionState.Open)
                    connection.Open();


                var result = new List<MachineDto>();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "exec [dbo].[ds_Get_Machines]";
                    command.Connection = connection;
                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.HasRows)
                        {
                            while (dataReader.Read())
                            {
                                result.Add(new MachineDto()
                                {
                                    Id = dataReader.GetInt32(0),
                                    MachineName = dataReader.GetString(1),
                                    IsOnline = dataReader.GetBoolean(2),
                                    Note = dataReader.GetString(3),
                                });
                            }
                        }
                    }
                }

                return Task.FromResult(result);
            }

        }

        public Task<List<ProxyDto>> GetProxies(CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                return Task.FromResult((from p in db.Proxies
                                        select new ProxyDto
                                        {
                                            Id = p.ProxyId,
                                            ProxyName = p.ProxyName,
                                            ProxyServer = p.ProxyServer,
                                            ProxyPassword = p.ProxyPassword
                                        }).ToList());
            }
        }

        public Task<List<ChannelDto>> GetChannels(CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                return Task.FromResult((from p in db.ChannelV2s
                                        select new ChannelDto
                                        {
                                            Id = p.Id,
                                            Active = p.Active,
                                            ChannelDescription = p.ChannelDescription,
                                            ChannelName = p.ChannelName,
                                            NumberOfAds = p.NumberOfAds,
                                            NumberOfRep = p.NumberOfRep,
                                            AdsPercentage = p.AdsPercentage,
                                            Nation = p.Nation,
                                            KeywordCategoryId = p.KeyWordCategoryId,
                                            Browser = p.Browser
                                        }).OrderBy(c => c.ChannelName).ToList());
            }
        }

        public Task<ChannelDto> GetChannel(int channelId, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var p = db.ChannelV2s.First(x => x.Id == channelId);
                return Task.FromResult(new ChannelDto
                {
                    Id = p.Id,
                    Active = p.Active,
                    ChannelDescription = p.ChannelDescription,
                    ChannelName = p.ChannelName,
                    NumberOfAds = p.NumberOfAds,
                    NumberOfRep = p.NumberOfRep,
                    AdsPercentage = p.AdsPercentage,
                    Nation = p.Nation,
                    KeywordCategoryId = p.KeyWordCategoryId,
                    Browser = p.Browser
                });
            }
        }

        public Task<List<KeywordCategory>> GetKeywordCategories(CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                return Task.FromResult(db.KeywordCategories.OrderBy(c => c.Name).ToList());
            }
        }

        public Task<int> AddChannel(ChannelDto channel, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var p = new ChannelV2
                {
                    ChannelName = channel.ChannelName,
                    ChannelDescription = channel.ChannelDescription,
                    Active = channel.Active,
                    NumberOfRep = channel.NumberOfRep,
                    NumberOfAds = channel.NumberOfAds,
                    AdsPercentage = channel.AdsPercentage,
                    Nation = channel.Nation,
                    KeyWordCategoryId = channel.KeywordCategoryId,
                    Browser = channel.Browser
                };
                db.ChannelV2s.Add(p);
                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<int> UpdateChannel(ChannelDto channel, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var c = db.ChannelV2s.First(x => x.Id == channel.Id);
                c.ChannelName = channel.ChannelName;
                c.ChannelDescription = channel.ChannelDescription;
                c.Active = channel.Active;
                c.NumberOfRep = channel.NumberOfRep;
                c.NumberOfAds = channel.NumberOfAds;
                c.AdsPercentage = channel.AdsPercentage;
                c.Nation = channel.Nation;
                c.KeyWordCategoryId = channel.KeywordCategoryId;
                c.Browser = channel.Browser;

                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<int> DeleteChannel(int channelId, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var c = db.ChannelV2s.First(x => x.Id == channelId);
                db.ChannelV2s.Remove(c);

                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<int> AddKeywordCategory(KeywordCategory keywordCategory, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                db.KeywordCategories.Add(keywordCategory);
                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<KeywordCategory> GetKeywordCategory(int keywordCategoryId, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                return Task.FromResult(db.KeywordCategories.First(x => x.KeywordCategoryId == keywordCategoryId));
            }
        }

        public Task<int> UpdateKeywordCategory(KeywordCategory keywordCategory, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var c = db.KeywordCategories.First(x => x.KeywordCategoryId == keywordCategory.KeywordCategoryId);
                c.Name = keywordCategory.Name;

                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<List<KeywordV2>> GetKeywords(int keywordCategoryId, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                return Task.FromResult(db.KeywordV2s.Where(x => x.CategoryId == keywordCategoryId).ToList());
            }
        }

        public Task<KeywordV2> GetKeyword(int id, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                return Task.FromResult(db.KeywordV2s.First(x => x.Id == id));
            }
        }

        public Task<int> AddKeyword(KeywordV2 keyword, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                db.KeywordV2s.Add(keyword);
                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<int> DeleteKeyword(int keywordId, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var c = db.KeywordV2s.First(x => x.Id == keywordId);
                db.KeywordV2s.Remove(c);

                return Task.FromResult(db.SaveChanges());
            }
        }

        public Task<int> UpdateKeyword(KeywordV2 keyword, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var k = db.KeywordV2s.First(x => x.Id == keyword.Id);
                k.Keyword = keyword.Keyword;
                k.Nation = keyword.Nation;
                k.Active = keyword.Active;
                k.NumberOfRep = keyword.NumberOfRep;
                k.Organic = keyword.Organic;
                k.NumberOfAdsClicks = keyword.NumberOfAdsClicks;
                k.AdsOnly = keyword.AdsOnly;
                k.CategoryId = keyword.CategoryId;

                return Task.FromResult(db.SaveChanges());
            }
        }

        public async Task<int> DeleteKeywordCategory(int keywordCategoryId, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                var c = db.KeywordCategories.First(x => x.KeywordCategoryId == keywordCategoryId);
                db.KeywordCategories.Remove(c);

                //return Task.FromResult(db.SaveChanges());
                return await db.SaveChangesAsync();
            }
        }

        public Task<int> AddBulkKeywords(List<KeywordV2> keywords, CancellationToken cancellationToken = default)
        {
            using (var db = new seContext())
            {
                db.KeywordV2s.AddRange(keywords);
                return Task.FromResult(db.SaveChanges());
            }
        }
    }
}
