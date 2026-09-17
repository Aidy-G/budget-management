using Dal.Api;
//using Dal.Models;
using BL.Api;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Common.Models;
using static Azure.Core.HttpHeader;

namespace BL.Services
{
    public class BlSchoolsService : IBLSchools
    {
        IDalSchools dal;
        IBLExpenditures exp;
        IBLUsers users;

        public BlSchoolsService(IDal data, IBLExpenditures exp, IBLUsers user)
        {
            dal = data.Schools;
            this.exp = exp;
            users = user;
        }

        public async Task<List<BlSchool>> GetSchools() =>
               CastingToBl(await dal.GetSchools());

        public async Task<BlSchool> GetSchoolBySymbol(int s)=>  
         (await GetSchools()).Find(school => school.SchoolSymbol == s) ?? throw new Exception("לא נמצא");


        public async Task<BlSchool>? GetSchoolBySName(string n)=>
             (await GetSchools()).Find(school => school.SchoolName == n)!;
        

        public async Task<List<BlExpenditure>>? GetExpendituresOfSchool(int s) =>
         (await GetSchoolBySymbol(s)).Expenditures.ToList();
       


        //Casting to BL
        public BlSchool CastingToBl(School s)
        {
            s.Users.ToList().ForEach(school => Console.WriteLine(school));

            BlSchool bls = new BlSchool()
            {
                SchoolSymbol = s.SchoolSymbol,
                SchoolName = s.SchoolName,
                Budget = s.Budget,
                Expenditures = exp.CastingToBl(s.Expenditures.ToList()),
                CurrentBudget = s.Budget - s.Expenditures.Sum(e => e.ExpenditureSum - e.AmountPaid)
            };
            return bls;
        }
        //Casting a list to bl
        public List<BlSchool> CastingToBl(List<School> list)
        {
            List<BlSchool> bls = new List<BlSchool>();

            list.ForEach(l => bls.Add(CastingToBl(l)));

            return bls;
        }

        //קבלת תקציב נוכחי
        public async Task<decimal> SetCurrBudget(int sSymbol)
        {
            BlSchool s = await  GetSchoolBySymbol(sSymbol) ?? throw new Exception("sdasd");
            decimal? f = (decimal)s.Budget - GetDebtOfSchool(s.SchoolName);
            return (decimal)(s.Budget - f);
        }

        //חוב מוסד
        //לתקן פונ זו כי מחשב את התקציב הכולל פחות הסכום שכבר שולם אבל לא לוקח בחשבון את ההוצאות שהוזמנו ועדיין לא שולמו
        public decimal GetDebtOfSchool(params string[] names)
        {
            decimal totalSum = 0;
            names.ToList().ForEach(async school =>
            {
                BlSchool s = await GetSchoolBySName(school)! ?? throw new Exception();
                //totalSum = s.Budget- GetSumOfEpendituresOfSchool(school);
                totalSum += (s.Expenditures.Sum(ss => ss.ExpenditureSum - ss.AmountPaid));
            });

            return totalSum;
            // decimal sum = 0;
            //BlSchool s = GetSchoolBySName(name)?? throw new Exception();
            //return s.Expenditures.Sum(ss => ss.ExpenditureSum - ss.AmountPaid);



            //s.Expenditures.ToList().ForEach(x =>
            //{ 
            //    sum += (x.ExpenditureSum - x.AmountPaid); }
            //);
            //return sum;
        }

        // סכום הוצאות של מוסד מסוים לפי סמל מוסד
        public async Task<decimal> GetSumOfEpendituresOfSchool(int schoolSymbol)
        {
            BlSchool s = await GetSchoolBySymbol(schoolSymbol);
            if (s == null)
                return 0;

            return s.Expenditures.Sum(e => e.ExpenditureSum);
        }
        public async Task<School> UpdateSchool(School school, int schoolS)
        {
            return await dal.UpdateSchool(school,schoolS);
        }
        public async Task<bool> Create(School s)
        {
            try
            {
                dal.Create(s);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("s not create");
            }
        }
        public void RemoveSchool(int sSymbol)
        {
            dal.RemoveSchool(sSymbol);
        }

        
    }

}
