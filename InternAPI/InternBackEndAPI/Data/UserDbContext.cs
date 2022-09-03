using InternAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternAPI.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }
        public DbSet<UserModel> userModels { get; set; }
        public DbSet<InternModel> internModels { get; set; }
        public DbSet<DesignationModel> designationModels { get; set; }
        public DbSet<StatusModel> statusModels { get; set; }
        public DbSet<LeavesModel> leaves { get; set; }
        public DbSet<WorkingHoursModel> workingHours { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InternModel>().ToTable("tbl_student");
            modelBuilder.Entity<DesignationModel>().ToTable("tbl_designation");
            modelBuilder.Entity<StatusModel>().ToTable("tbl_status");
            modelBuilder.Entity<LeavesModel>().ToTable("tbl_leaves");
            modelBuilder.Entity<WorkingHoursModel>().ToTable("tbl_workinghours");

            modelBuilder.Entity<UserModel>().ToTable("tbl_user");
        }
    }
}
