using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDal
    {
        public IDalUsers Users { get; } 
        public IDalExpenditures Expenditures { get; }
        public IDalSchools Schools { get; }
        public IDalSuppliers Suppliers { get; }
        public IDalCategories Categories { get; }
    }
}
