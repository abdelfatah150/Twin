using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.Entities
{
    public class Developer : BaseEntity
    {
        public bool isActive;
        public bool isWorking;
        public ProjectTask? CurrentTask;
        public double SkillTestScore;
        public string GithubLink;
        public List<string> Titles;
        public List<string> Skills;
        public int RejectedOffersCounter;
        public int MissedOffersCounter;
        public Offer? CurrentOffer;
        public List<ProjectTask> FinishedTasks;
        public double AvgTasksRating;
        public List<bool> HassAccessToMarketplace;
        public bool IsConfirmed;
    }
}
