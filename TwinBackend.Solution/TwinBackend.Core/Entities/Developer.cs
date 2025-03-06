using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.Entities
{
    public class Developer : BaseEntity
    {
        public string Email { get; set; }
        public bool isActive { get; set; }
        public bool isWorking { get; set; }
        //public ProjectTask? CurrentTask;
        public double SkillTestScore { get; set; }
        public string GithubLink { get; set; }
        public List<DeveloperTitle> Titles { get; set; }
        public List<DeveloperSkill> Skills { get; set; }
        public int RejectedOffersCounter { get; set; }
        public int MissedOffersCounter { get; set; }
        //public Offer? CurrentOffer;
        //public List<ProjectTask> FinishedTasks;
        public double AvgTasksRating { get; set; }
        //public List<bool> HassAccessToMarketplace;
        public bool IsConfirmed { get; set; }
    }
}
