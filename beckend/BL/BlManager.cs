using BL.Api;
using Dal.Api;
using BL.Services;
using Dal;
using Microsoft.Extensions.DependencyInjection;

namespace BL
{
    public class BlManager : IBL
    {
        public IBLUsers Users { get; }

        public IBLExpenditures Expenditures { get; }

        public IBLSchools Schools { get; }

        public IBLSuppliers Suppliers { get; }

        public IBLCategories Categories { get; }


        public BlManager()
        {
        
        


            ServiceCollection services = new ServiceCollection();
            services.AddScoped<IDal, DalManager>();
            services.AddScoped<IBLCategories, BlCategoriesService>();
            services.AddScoped<IBLExpenditures,BlExpendituresService>();
            services.AddScoped<IBLSchools, BlSchoolsService>();
            services.AddScoped<IBLUsers, BlUsersService>();
            services.AddScoped<IBLSuppliers, BlSuppliersService>();
            services.AddScoped< BlExpenditureForSupplier>();


            ServiceProvider serviceProvider = services.BuildServiceProvider();
            Users = serviceProvider.GetRequiredService<IBLUsers>();
            Schools = serviceProvider.GetRequiredService<IBLSchools>();
            Suppliers = serviceProvider.GetRequiredService<IBLSuppliers>();
            Categories = serviceProvider.GetRequiredService<IBLCategories>();
            Expenditures = serviceProvider.GetRequiredService<IBLExpenditures>();



        }
    }
}