




////////using Microsoft.EntityFrameworkCore;
////////using Microsoft.EntityFrameworkCore.Infrastructure;
////////using BL;
////////using BL.Api;
////////using System.Text.Json.Serialization;

////////namespace Ui
////////{
////////    public class Program
////////    {
////////        public static void Main(string[] args)
////////        {
////////            var builder = WebApplication.CreateBuilder(args);

////////            // Add services to the container.

////////            builder.Services.AddControllers();
////////            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
////////            builder.Services.AddEndpointsApiExplorer();
////////            builder.Services.AddSwaggerGen();


////////            builder.Services.AddControllers()
////////            .AddJsonOptions(options =>
////////            {
////////                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

////////            }
////////            );

////////            builder.Services.AddCors(c => c.AddPolicy("AllowAll",
////////            option => option.AllowAnyOrigin().AllowAnyHeader().AllowAnyHeader().AllowAnyMethod()));


////////            builder.Services.AddScoped<IBL, BlManager>();

////////            builder.Services.AddDbContext<DbContext>(options =>
////////            options.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=\"F:\\תיקייה כללית חדש\\שנה ב תשפה\\קבוצה ב\\תלמידות\\תלמידות\\Sary Wagman\\מחני\\WebAPI-Project\\Dal\\Server.mdf\";Integrated Security=True;Connect Timeout=30"));


////////            //builder.Services.AddCors(options =>
////////            //{
////////            //    options.AddPolicy("AllowAll", policy =>
////////            //    {
////////            //        policy.AllowAnyOrigin()
////////            //              .AllowAnyMethod()
////////            //              .AllowAnyHeader();
////////            //    });
////////            //});

////////            var app = builder.Build();

////////            //להעתיק אחרי הגדרת ה app
////////            app.UseCors("AllowAll");
////////            // Configure the HTTP request pipeline.
////////            if (app.Environment.IsDevelopment())
////////            {
////////                app.UseSwagger();
////////                app.UseSwaggerUI();
////////            }

////////            app.UseHttpsRedirection();

////////            app.UseAuthorization();


////////            app.MapControllers();

////////            app.Run();

////////        }

////////        //private static void connectionString(SqlServerDbContextOptionsBuilder builder)
////////        //{
////////        //    throw new NotImplementedException();
////////        //}
////////    }
////////}


//////////using Microsoft.EntityFrameworkCore;
//////////using Microsoft.EntityFrameworkCore.Infrastructure;
//////////using BL;
//////////using BL.Api;
//////////using System.Text.Json.Serialization;
//////////using Dal.Models; // הוסף את זה!

//////////namespace Ui
//////////{
//////////    public class Program
//////////    {
//////////        public static void Main(string[] args)
//////////        {
//////////            var builder = WebApplication.CreateBuilder(args);

//////////            // Add services to the container
//////////            builder.Services.AddControllers()
//////////                .AddJsonOptions(options => {
//////////                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//////////                });

//////////            builder.Services.AddEndpointsApiExplorer();
//////////            builder.Services.AddSwaggerGen();

//////////            builder.Services.AddCors(options =>
//////////            {
//////////                options.AddPolicy("AllowAll", policy =>
//////////                {
//////////                    policy.AllowAnyOrigin()
//////////                          .AllowAnyMethod()
//////////                          .AllowAnyHeader();
//////////                });
//////////            });

//////////            builder.Services.AddScoped<IBL, BlManager>();

//////////            // **זה התיקון העיקרי - החלפתי DbContext ב-dbcontext**
//////////            builder.Services.AddDbContext<dbcontext>(options =>
//////////                options.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=\"F:\\תיקייה כללית חדש\\שנה ב תשפה\\קבוצה ב\\תלמידות\\תלמידות\\Sary Wagman\\מחני\\WebAPI-Project\\Dal\\Server.mdf\";Integrated Security=True;Connect Timeout=30"));

//////////            var app = builder.Build();

//////////            app.UseCors("AllowAll");

//////////            if (app.Environment.IsDevelopment())
//////////            {
//////////                app.UseSwagger();
//////////                app.UseSwaggerUI();
//////////            }

//////////            app.UseHttpsRedirection();
//////////            app.UseAuthorization();
//////////            app.MapControllers();

//////////            app.Run();
//////////        }
//////////    }
//////////}
////using Microsoft.EntityFrameworkCore;
////using Dal.Models;
////using BL.Api;
////using BL;

////var builder = WebApplication.CreateBuilder(args);

////// הוספת שירותים בסיסיים
////builder.Services.AddControllers();
////builder.Services.AddEndpointsApiExplorer();
////builder.Services.AddSwaggerGen();

////// הוספת מסד נתונים SQLite
////builder.Services.AddDbContext<dbcontext>(options =>
////    options.UseSqlite("Data Source=school_budget.db"));
////builder.Services.AddScoped<IBL, BlManager>();

////// הוספת CORS
////builder.Services.AddCors(options =>
////{
////    options.AddDefaultPolicy(policy =>
////    {
////        policy.AllowAnyOrigin()
////              .AllowAnyMethod()
////              .AllowAnyHeader();
////    });
////});

////var app = builder.Build();

////// יצירת מסד הנתונים
////using (var scope = app.Services.CreateScope())
////{
////    var context = scope.ServiceProvider.GetRequiredService<dbcontext>();
////    try
////    {
////        context.Database.EnsureCreated();
////        Console.WriteLine("✅ מסד הנתונים נוצר בהצלחה!");
////    }
////    catch (Exception ex)
////    {
////        Console.WriteLine($"❌ שגיאה ביצירת מסד נתונים: {ex.Message}");
////    }
////}

////// הגדרות השרת
////if (app.Environment.IsDevelopment())
////{
////    app.UseSwagger();
////    app.UseSwaggerUI();
////}

////app.UseCors();
////app.UseHttpsRedirection();
////app.UseAuthorization();
////app.MapControllers();

////Console.WriteLine("🚀 השרת מתחיל...");
////Console.WriteLine("🗄️ מסד נתונים: SQLite");
////Console.WriteLine("🌐 פתחי: https://localhost:7086/swagger");

////app.Run();

//using Microsoft.EntityFrameworkCore;
//using Dal.Models;
//using BL.Services;
//using Dal.Services;
//using Common.Models;

//var builder = WebApplication.CreateBuilder(args);

//// הוספת שירותים בסיסיים
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// הוספת מסד נתונים SQLite
//builder.Services.AddDbContext<dbcontext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

//// הוספת שירותי DAL
//builder.Services.AddScoped<DalCategoriesService>();
//builder.Services.AddScoped<DalUsersService>();
//builder.Services.AddScoped<DalSuppliersService>();
//builder.Services.AddScoped<DalExpendituresService>();
//builder.Services.AddScoped<DalSchoolsService>();

//// הוספת שירותי BL
//builder.Services.AddScoped<BlUsersService>();
//builder.Services.AddScoped<BlCategoriesService>();
//builder.Services.AddScoped<BlSuppliersService>();
//builder.Services.AddScoped<BlExpendituresService>();
//builder.Services.AddScoped<BlSchoolsService>();

//// הוספת CORS
//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(policy =>
//    {
//        policy.AllowAnyOrigin()
//              .AllowAnyMethod()
//              .AllowAnyHeader();
//    });
//});

//var app = builder.Build();

//// יצירת מסד הנתונים ונתונים לדוגמה
//using (var scope = app.Services.CreateScope())
//{
//    var context = scope.ServiceProvider.GetRequiredService<dbcontext>();
//    try
//    {
//        // יצירת מסד הנתונים
//        context.Database.EnsureCreated();
//        Console.WriteLine("✅ מסד הנתונים נוצר בהצלחה!");

//        // הוספת נתונים לדוגמה אם הטבלאות ריקות
//        if (!context.Schools.Any())
//        {
//            // הוספת בתי ספר
//            var schools = new List<School>
//            {
//                new School { SchoolSymbol = 1001, SchoolName = "בית ספר יסודי הרצל", Budget = 500000 },
//                new School { SchoolSymbol = 1002, SchoolName = "בית ספר תיכון בן גוריון", Budget = 750000 },
//                new School { SchoolSymbol = 0, SchoolName = "מנהל מערכת", Budget = 0 }
//            };
//            context.Schools.AddRange(schools);

//            // הוספת קטגוריות
//            var categories = new List<Category>
//            {
//                new Category { CategoryName = "ציוד לימוד" },
//                new Category { CategoryName = "ספרים" },
//                new Category { CategoryName = "ציוד משרדי" },
//                new Category { CategoryName = "תחזוקה" },
//                new Category { CategoryName = "טכנולוgiה" }
//            };
//            context.Categories.AddRange(categories);

//            // הוספת ספקים
//            var suppliers = new List<Supplier>
//            {
//                new Supplier
//                {
//                    LicensedNum = 123456789,
//                    SupplierName = "ספקי ציוד לימודי בע\"מ",
//                    BankCode = 12,
//                    NumOfBankBranch = 345,
//                    NumOfBankAccount = 678901,
//                    NameOfOwnerAccount = "יוסי כהן"
//                },
//                new Supplier
//                {
//                    LicensedNum = 987654321,
//                    SupplierName = "חברת הספרים הישראלית",
//                    BankCode = 20,
//                    NumOfBankBranch = 123,
//                    NumOfBankAccount = 456789,
//                    NameOfOwnerAccount = "רחל לוי"
//                }
//            };
//            context.Suppliers.AddRange(suppliers);

//            // הוספת משתמשים
//            var users = new List<User>
//            {
//                new User { Id = 1, UserName = "מנהל מערכת", SchoolSymbol = 0 },
//                new User { Id = 1001, UserName = "מנהל הרצל", SchoolSymbol = 1001 },
//                new User { Id = 1002, UserName = "מנהל בן גוריון", SchoolSymbol = 1002 }
//            };
//            context.Users.AddRange(users);

//            context.SaveChanges();

//            // הוספת הוצאות לדוגמה
//            var expenditures = new List<Expenditure>
//            {
//                new Expenditure
//                {
//                    ExpenditureSum = 5000,
//                    CategoryId = 1,
//                    SupplierNum = 123456789,
//                    Date = DateTime.Now.AddDays(-10),
//                    OrdererName = "מנהל הרצל",
//                    InvoiceNum = 1001,
//                    IsAccepted = false,
//                    AmountPaid = 0,
//                    SchoolSymbol = 1001
//                },
//                new Expenditure
//                {
//                    ExpenditureSum = 3000,
//                    CategoryId = 2,
//                    SupplierNum = 987654321,
//                    Date = DateTime.Now.AddDays(-5),
//                    OrdererName = "מנהל בן גוריון",
//                    InvoiceNum = 1002,
//                    IsAccepted = true,
//                    AmountPaid = 1500,
//                    SchoolSymbol = 1002
//                }
//            };
//            context.Expenditures.AddRange(expenditures);
//            context.SaveChanges();

//            Console.WriteLine("✅ נתונים לדוגמה נוספו בהצלחה!");
//        }
//    }
//    catch (Exception ex)
//    {
//        Console.WriteLine($"❌ שגיאה: {ex.Message}");
//    }
//}

//// הגדרות השרת
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseCors();
//app.UseHttpsRedirection();
//app.UseAuthorization();
//app.MapControllers();

//Console.WriteLine("🚀 השרת מתחיל...");
//Console.WriteLine("🗄️ מסד נתונים: SQLite - SchoolBudget.db");
//Console.WriteLine("🌐 Swagger: https://localhost:7086/swagger");
//Console.WriteLine("📊 נתונים לדוגמה נוספו אוטומטית!");

//app.Run();

using Microsoft.EntityFrameworkCore;
using Dal.Models;
using BL.Api;
using BL;
using Common.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// הוספת שירותים
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// הגדרת JSON options נוספת
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.SerializerOptions.WriteIndented = true;
});

// הוספת מסד נתונים
builder.Services.AddDbContext<dbcontext>(options =>
    options.UseSqlite("Data Source=SchoolBudget.db"));

// הוספת BL
builder.Services.AddScoped<IBL, BlManager>();

// הוספת CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// יצירת מסד נתונים עם נתונים לדוגמה
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<dbcontext>();
    try
    {
        context.Database.EnsureCreated();
        if (!context.Schools.Any())
        {
            // מחיקת מסד נתונים ישן ויצירת חדש
            //context.Database.EnsureDeleted();
            //context.Database.EnsureCreated();
            Console.WriteLine("🗄️ יוצר מסד נתונים חדש...");

            // הוספת בתי ספר לדוגמה (כולל בית ספר 0 למנהל מערכת)
            var schools = new List<School>
        {
            new School { SchoolSymbol = 0, SchoolName = "מנהל מערכת", Budget = 0 },
            new School { SchoolSymbol = 1, SchoolName = "בית ספר אלון", Budget = 100000 },
            new School { SchoolSymbol = 2, SchoolName = "בית ספר תמר", Budget = 150000 },
            new School { SchoolSymbol = 3, SchoolName = "בית ספר אורן", Budget = 120000 }
        };
            context.Schools.AddRange(schools);
            context.SaveChanges();
            Console.WriteLine("✅ בתי ספר נוספו בהצלחה");

            // הוספת קטגוריות לדוגמה
            var categories = new List<Category>
        {
            new Category { CategoryId = 1, CategoryName = "ציוד לימוד" },
            new Category { CategoryId = 2, CategoryName = "ציוד משרדי" },
            new Category { CategoryId = 3, CategoryName = "תחזוקה ותיקונים" },
            new Category { CategoryId = 4, CategoryName = "חשמל ומים" },
            new Category { CategoryId = 5, CategoryName = "ניקיון" },
            new Category { CategoryId = 6, CategoryName = "מזון וכיבוד" },
            new Category { CategoryId = 7, CategoryName = "פעילויות חינוכיות" },
            new Category { CategoryId = 8, CategoryName = "ביטוח ואבטחה" }
        };
            context.Categories.AddRange(categories);
            context.SaveChanges();
            Console.WriteLine("✅ קטגוריות נוספו בהצלחה");

            // הוספת ספקים לדוגמה
            var suppliers = new List<Supplier>
        {
            new Supplier { LicensedNum = 123456789, SupplierName = "ספקי ציוד לימודי בע\"מ", BankCode = 10, NumOfBankBranch = 123, NumOfBankAccount = 456789, NameOfOwnerAccount = "משה ספק" },
            new Supplier { LicensedNum = 987654321, SupplierName = "משרד וציוד", BankCode = 12, NumOfBankBranch = 456, NumOfBankAccount = 789123, NameOfOwnerAccount = "שרה משרדית" },
            new Supplier { LicensedNum = 456789123, SupplierName = "תיקונים מהירים", BankCode = 20, NumOfBankBranch = 789, NumOfBankAccount = 123456, NameOfOwnerAccount = "דני תיקונים" },
            new Supplier { LicensedNum = 111222333, SupplierName = "חברת החשמל", BankCode = 11, NumOfBankBranch = 111, NumOfBankAccount = 222333, NameOfOwnerAccount = "חברת החשמל" },
            new Supplier { LicensedNum = 555666777, SupplierName = "ניקיון מושלם", BankCode = 17, NumOfBankBranch = 555, NumOfBankAccount = 666777, NameOfOwnerAccount = "רינה ניקיון" }
        };
            context.Suppliers.AddRange(suppliers);
            context.SaveChanges();
            Console.WriteLine("✅ ספקים נוספו בהצלחה");

            // הוספת משתמשים לדוגמה
            var users = new List<User>
        {
            new User { Id = 1001, UserName = "מנהל מערכת", SchoolSymbol = 0 },
            new User { Id = 2001, UserName = "רחל כהן", SchoolSymbol = 1 },
            new User { Id = 2002, UserName = "דוד לוי", SchoolSymbol = 2 },
            new User { Id = 2003, UserName = "שרה אברהם", SchoolSymbol = 3 },
            new User { Id = 3001, UserName = "יוסי מזכיר", SchoolSymbol = 1 }
        };
            context.Users.AddRange(users);
            context.SaveChanges();
            Console.WriteLine("✅ משתמשים נוספו בהצלחה");

            // הוספת הוצאות לדוגמה
            var expenditures = new List<Expenditure>
        {
            // הוצאות בית ספר אלון
            new Expenditure { SchoolSymbol = 1, ExpenditureSum = 2500.00m, CategoryId = 1, SupplierNum = 123456789, Date = DateTime.Now.AddDays(-30), OrdererName = "רחל כהן", InvoiceNum = 1001, IsAccepted = true, AmountPaid = 2500.00m },
            new Expenditure { SchoolSymbol = 1, ExpenditureSum = 800.00m, CategoryId = 2, SupplierNum = 987654321, Date = DateTime.Now.AddDays(-25), OrdererName = "יוסי מזכיר", InvoiceNum = 1002, IsAccepted = true, AmountPaid = 400.00m },
            new Expenditure { SchoolSymbol = 1, ExpenditureSum = 1200.00m, CategoryId = 3, SupplierNum = 456789123, Date = DateTime.Now.AddDays(-20), OrdererName = "רחל כהן", InvoiceNum = 1003, IsAccepted = false, AmountPaid = 0.00m },
            
            // הוצאות בית ספר תמר
            new Expenditure { SchoolSymbol = 2, ExpenditureSum = 3200.00m, CategoryId = 4, SupplierNum = 111222333, Date = DateTime.Now.AddDays(-15), OrdererName = "דוד לוי", InvoiceNum = 2001, IsAccepted = true, AmountPaid = 3200.00m },
            new Expenditure { SchoolSymbol = 2, ExpenditureSum = 950.00m, CategoryId = 5, SupplierNum = 555666777, Date = DateTime.Now.AddDays(-10), OrdererName = "דוד לוי", InvoiceNum = 2002, IsAccepted = true, AmountPaid = 950.00m },
            new Expenditure { SchoolSymbol = 2, ExpenditureSum = 1800.00m, CategoryId = 6, SupplierNum = 123456789, Date = DateTime.Now.AddDays(-5), OrdererName = "דוד לוי", InvoiceNum = 2003, IsAccepted = false, AmountPaid = 0.00m },
            
            // הוצאות בית ספר אורן
            new Expenditure { SchoolSymbol = 3, ExpenditureSum = 2200.00m, CategoryId = 7, SupplierNum = 987654321, Date = DateTime.Now.AddDays(-12), OrdererName = "שרה אברהם", InvoiceNum = 3001, IsAccepted = true, AmountPaid = 1100.00m },
            new Expenditure { SchoolSymbol = 3, ExpenditureSum = 750.00m, CategoryId = 8, SupplierNum = 456789123, Date = DateTime.Now.AddDays(-8), OrdererName = "שרה אברהם", InvoiceNum = 3002, IsAccepted = false, AmountPaid = 0.00m },
            new Expenditure { SchoolSymbol = 3, ExpenditureSum = 1500.00m, CategoryId = 1, SupplierNum = 123456789, Date = DateTime.Now.AddDays(-3), OrdererName = "שרה אברהם", InvoiceNum = 3003, IsAccepted = true, AmountPaid = 1500.00m },
            
            // הוצאות נוספות
            new Expenditure { SchoolSymbol = 1, ExpenditureSum = 650.00m, CategoryId = 5, SupplierNum = 555666777, Date = DateTime.Now.AddDays(-2), OrdererName = "יוסי מזכיר", InvoiceNum = 1004, IsAccepted = false, AmountPaid = 0.00m }
        };
            context.Expenditures.AddRange(expenditures);
            context.SaveChanges();
            Console.WriteLine("✅ הוצאות נוספו בהצלחה");

            Console.WriteLine("\n🎉 מסד הנתונים נוצר בהצלחה עם כל הנתונים לדוגמה!");
            Console.WriteLine("\n📊 סיכום הנתונים:");
            Console.WriteLine($"   • {schools.Count} בתי ספר");
            Console.WriteLine($"   • {users.Count} משתמשים");
            Console.WriteLine($"   • {categories.Count} קטגוריות");
            Console.WriteLine($"   • {suppliers.Count} ספקים");
            Console.WriteLine($"   • {expenditures.Count} הוצאות");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ שגיאה ביצירת מסד הנתונים: {ex.Message}");
        Console.WriteLine($"📝 פרטי השגיאה: {ex.InnerException?.Message}");
    }
}

// הגדרות השרת
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

Console.WriteLine("\n🚀 השרת מתחיל...");
Console.WriteLine("🌐 HTTPS: https://localhost:7086");
Console.WriteLine("🌐 HTTP: http://localhost:5086");
Console.WriteLine("📖 Swagger: https://localhost:7086/swagger");
Console.WriteLine("👥 Users API: https://localhost:7086/api/User");
Console.WriteLine("🔗 React CORS: מופעל");
Console.WriteLine("🎉 מסד הנתונים נוצר בהצלחה עם כל הנתונים לדוגמה!");

app.Run();
