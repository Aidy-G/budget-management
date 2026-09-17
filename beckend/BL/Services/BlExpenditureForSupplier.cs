using BL.Api;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BlExpenditureForSupplier
    {
        IBLSuppliers supp;
       public BlExpenditureForSupplier(IBLSuppliers supp) {
            this.supp = supp;
       }

        public async Task<BlSupplier?> GetSupplierByName(string name)
        {
            return await supp.GetSupplierByName(name)!;
        }

    }
}
