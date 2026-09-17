using Common.Models;
using Dal.Api;
using Dal.Models;
using Dal.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class DalManager : IDal
    {
        public IDalUsers Users { get; }

        public IDalExpenditures Expenditures { get; }

        public IDalSchools Schools { get; }

        public IDalSuppliers Suppliers { get; }

        public IDalCategories Categories { get; }

        public DalManager()
        {
            ServiceCollection services = new ServiceCollection();
            services.AddScoped <dbcontext>();
            services.AddScoped<IDalCategories, DalCategoriesService>();
            services.AddScoped<IDalExpenditures, DalExpendituresService>();
            services.AddScoped<IDalSchools, DalSchoolsService>();
            services.AddScoped<IDalUsers, DalUsersService>();
            services.AddScoped<IDalSuppliers, DalSuppliersService>();
            
            
            ServiceProvider serviceProvider = services.BuildServiceProvider();
           

            Users = serviceProvider.GetRequiredService<IDalUsers>();
            Schools = serviceProvider.GetRequiredService<IDalSchools>();
            Suppliers = serviceProvider.GetRequiredService<IDalSuppliers>();
            Categories = serviceProvider.GetRequiredService<IDalCategories>();
            Expenditures = serviceProvider.GetRequiredService<IDalExpenditures>();

        }
    }
}
