using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BL.Api
{
    public interface IBL
    {
        IBLUsers Users { get; }
        IBLExpenditures Expenditures { get; }
        IBLSchools Schools { get; }
        IBLSuppliers Suppliers { get; }
        IBLCategories Categories { get; }
    }
}
