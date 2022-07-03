using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Services.Models
{
    public partial class seContext : DbContext
    {
        public seContext()
        {
        }

        public seContext(DbContextOptions<seContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ArchChannel> ArchChannels { get; set; } = null!;
        public virtual DbSet<ArchImportKw> ArchImportKws { get; set; } = null!;
        public virtual DbSet<ArchKeyword> ArchKeywords { get; set; } = null!;
        public virtual DbSet<ArchKeywordPrep> ArchKeywordPreps { get; set; } = null!;
        public virtual DbSet<ArchNotInUseMachine> ArchNotInUseMachines { get; set; } = null!;
        public virtual DbSet<ArchStatistic> ArchStatistics { get; set; } = null!;
        public virtual DbSet<BlockedIp> BlockedIps { get; set; } = null!;
        public virtual DbSet<ChannelProxy> ChannelProxies { get; set; } = null!;
        public virtual DbSet<ChannelUserAgent> ChannelUserAgents { get; set; } = null!;
        public virtual DbSet<ChannelV2> ChannelV2s { get; set; } = null!;
        public virtual DbSet<KeywordCategory> KeywordCategories { get; set; } = null!;
        public virtual DbSet<KeywordV2> KeywordV2s { get; set; } = null!;
        public virtual DbSet<Machine> Machines { get; set; } = null!;
        public virtual DbSet<MachineChannel> MachineChannels { get; set; } = null!;
        public virtual DbSet<MachineProxy> MachineProxies { get; set; } = null!;
        public virtual DbSet<Monitor> Monitors { get; set; } = null!;
        public virtual DbSet<Proxy> Proxies { get; set; } = null!;
        public virtual DbSet<ProxyNation> ProxyNations { get; set; } = null!;
        public virtual DbSet<ScreenSize> ScreenSizes { get; set; } = null!;
        public virtual DbSet<UserAgent> UserAgents { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=154.53.40.196;Database=se;User Id=se_user;Password=SE09798pAt12;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ArchChannel>(entity =>
            {
                entity.ToTable("ARCH_Channel");

                entity.Property(e => e.ChannelDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ChannelName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ArchImportKw>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ARCH_ImportKW");

                entity.Property(e => e.CompetitiveDensity).HasColumnName("Competitive_Density");

                entity.Property(e => e.CpcUsd).HasColumnName("CPC_USD");

                entity.Property(e => e.Intent).HasMaxLength(500);

                entity.Property(e => e.Keyword).HasMaxLength(500);

                entity.Property(e => e.KeywordDifficulty).HasColumnName("Keyword_Difficulty");

                entity.Property(e => e.NumberOfResults).HasColumnName("Number_of_Results");

                entity.Property(e => e.SerpFeatures)
                    .HasMaxLength(1000)
                    .HasColumnName("SERP_Features");

                entity.Property(e => e.Trend).HasMaxLength(1000);
            });

            modelBuilder.Entity<ArchKeyword>(entity =>
            {
                entity.ToTable("ARCH_Keyword");

                entity.HasIndex(e => new { e.Nation, e.Active }, "NonClusteredIndex-20211220-155439");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Keyword)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Nation)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ArchKeywordPrep>(entity =>
            {
                entity.ToTable("ARCH_Keyword_Prep");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Epc)
                    .HasColumnType("money")
                    .HasColumnName("EPC");

                entity.Property(e => e.Keyword)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Nation)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ArchNotInUseMachine>(entity =>
            {
                entity.ToTable("ARCH_NotInUseMachine");

                entity.Property(e => e.BaseUrl)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.BotName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MachineName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nation)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Note)
                    .HasMaxLength(1000)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ArchStatistic>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ARCH_Statistic");

                entity.Property(e => e.ClickThroughRate).HasColumnName("Click Through Rate");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.MonetizedRpm).HasColumnName("Monetized RPM");

                entity.Property(e => e.MonetizedSearches).HasColumnName("Monetized Searches");

                entity.Property(e => e.RevenuePerClick).HasColumnName("Revenue Per Click");

                entity.Property(e => e.RevenuePerView).HasColumnName("Revenue Per View");

                entity.Property(e => e.SearchChannel)
                    .HasMaxLength(500)
                    .HasColumnName("Search Channel");

                entity.Property(e => e.TrafficQuality).HasColumnName("Traffic Quality");
            });

            modelBuilder.Entity<BlockedIp>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("BlockedIP");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Ip)
                    .HasMaxLength(50)
                    .HasColumnName("IP");
            });

            modelBuilder.Entity<ChannelProxy>(entity =>
            {
                entity.HasKey(e => new { e.ChannelId, e.ProxyId });

                entity.ToTable("ChannelProxy");
            });

            modelBuilder.Entity<ChannelUserAgent>(entity =>
            {
                entity.ToTable("ChannelUserAgent");
            });

            modelBuilder.Entity<ChannelV2>(entity =>
            {
                entity.ToTable("ChannelV2");

                entity.Property(e => e.Browser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ChannelDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ChannelName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nation)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<KeywordCategory>(entity =>
            {
                entity.ToTable("KeywordCategory");

                entity.Property(e => e.Name).HasMaxLength(200);
            });

            modelBuilder.Entity<KeywordV2>(entity =>
            {
                entity.ToTable("KeywordV2");

                entity.Property(e => e.CompetitiveDensity).HasColumnName("Competitive_Density");

                entity.Property(e => e.CpcUsd).HasColumnName("CPC_USD");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Intent).HasMaxLength(500);

                entity.Property(e => e.Keyword)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.KeywordDifficulty).HasColumnName("Keyword_Difficulty");

                entity.Property(e => e.Nation)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NumberOfResults).HasColumnName("Number_of_Results");

                entity.Property(e => e.SerpFeatures)
                    .HasMaxLength(1000)
                    .HasColumnName("SERP_Features");

                entity.Property(e => e.Trend).HasMaxLength(1000);
            });

            modelBuilder.Entity<Machine>(entity =>
            {
                entity.ToTable("Machine");

                entity.Property(e => e.BaseUrl)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.BotName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CheckIp).HasColumnName("CheckIP");

                entity.Property(e => e.MachineName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nation)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Note)
                    .HasMaxLength(1000)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MachineChannel>(entity =>
            {
                entity.ToTable("MachineChannel");
            });

            modelBuilder.Entity<MachineProxy>(entity =>
            {
                entity.HasKey(e => new { e.MachineId, e.ProxyId });

                entity.ToTable("MachineProxy");
            });

            modelBuilder.Entity<Monitor>(entity =>
            {
                entity.ToTable("Monitor");

                entity.HasIndex(e => e.CreatedDate, "NC_IP");

                entity.HasIndex(e => e.MachineName, "NonClusteredIndex-20220307-152228");

                entity.HasIndex(e => e.Ip, "NonClusteredIndex-20220326-154106");

                entity.Property(e => e.AfterAdsClick).HasColumnType("datetime");

                entity.Property(e => e.BeforeAdsClick).HasColumnType("datetime");

                entity.Property(e => e.BrowserOpenTime).HasColumnType("datetime");

                entity.Property(e => e.Channel)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.Exception).HasColumnType("text");

                entity.Property(e => e.Ip)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("IP");

                entity.Property(e => e.IpsearchCount).HasColumnName("IPSearchCount");

                entity.Property(e => e.KeyWord)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.MachineName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MasterPageLoaded).HasColumnType("datetime");

                entity.Property(e => e.ProxyServer)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ScreenSize)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.Url)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.UrlAfterProxy)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.UserAgent)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Proxy>(entity =>
            {
                entity.ToTable("Proxy");

                entity.Property(e => e.ProxyName).HasMaxLength(50);

                entity.Property(e => e.ProxyPassword)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ProxyServer).HasMaxLength(50);

                entity.Property(e => e.ProxyUsername)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ProxyNation>(entity =>
            {
                entity.HasKey(e => new { e.ProxyId, e.Nation });

                entity.ToTable("ProxyNation");

                entity.Property(e => e.Nation)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProxyPassword)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ProxyServer)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProxyUsername)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ScreenSize>(entity =>
            {
                entity.ToTable("ScreenSize");

                entity.Property(e => e.BrowserType)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserAgent>(entity =>
            {
                entity.ToTable("UserAgent");

                entity.Property(e => e.BrowserType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserAgent1)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("UserAgent");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
