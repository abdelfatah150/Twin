
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TwinBackend.APIs.Helpers;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Repositories.Contract;
using TwinBackend.Repository.Data;
using TwinBackend.Repository.Data.Repositories;
using TwinBackend.Service.Services;
using TwinBackend.Service.HelperServices;
using MailKit;
using Org.BouncyCastle.Asn1.X509.Qualified;
using TwinBackend.Service.Security;
using StackExchange.Redis;
using CsvHelper;
using System.ComponentModel;
using System.Globalization;

namespace TwinBackend.APIs
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            
            
            builder.Services.AddDbContext<AccountDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("TwinAuth"));
            });

            builder.Services.AddDbContext<TwinDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("TwinDB"));
            });

            builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;

            }).AddEntityFrameworkStores<AccountDbContext>()
            .AddDefaultTokenProviders();


            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                    };
                });

            builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRespository<>));
            builder.Services.AddScoped<TechnicalTestService,TechnicalTestService>();
            builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
            builder.Services.AddScoped<TwinBackend.Service.MainServices.MailService>();
            builder.Services.AddAutoMapper(typeof(MappedProfile));
            builder.Services.AddScoped(typeof(IJwtService), typeof(JwtService));
            builder.Services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));

            builder.Services.AddSingleton<IConnectionMultiplexer>((ServiceProvider) =>
            {
                var connection = builder.Configuration.GetConnectionString("Redis");
                return ConnectionMultiplexer.Connect(connection);
            }
            );

            builder.Services.AddSingleton<ICacheService, CacheService>();


            builder.Services.AddAuthorization();




            // cors frontend 
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173") // Allow React frontend
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials(); // Only needed if using cookies/authentication
                    });
            });


            var app = builder.Build();



            // Enable CORS before authentication
            app.UseCors("AllowFrontend");



            //try
            //{
            //    var scope = app.Services.CreateScope();
            //    var service = scope.ServiceProvider;
            //    var questionRepository = service.GetRequiredService<IGenericRepository<Question>>();

            //    var files = new List<string>() { "D:\\Collage\\4th_year\\GP\\Twin\\TwinBackend.Solution\\TwinBackend.Repository\\Data\\DataSeed\\C++_Questions.csv", "D:\\Collage\\4th_year\\GP\\Twin\\TwinBackend.Solution\\TwinBackend.Repository\\Data\\DataSeed\\HTML_Questions.csv", "D:\\Collage\\4th_year\\GP\\Twin\\TwinBackend.Solution\\TwinBackend.Repository\\Data\\DataSeed\\Java_Questions.csv", "D:\\Collage\\4th_year\\GP\\Twin\\TwinBackend.Solution\\TwinBackend.Repository\\Data\\DataSeed\\JavaScript_Questions.csv", "D:\\Collage\\4th_year\\GP\\Twin\\TwinBackend.Solution\\TwinBackend.Repository\\Data\\DataSeed\\PHP_Questions.csv", "D:\\Collage\\4th_year\\GP\\Twin\\TwinBackend.Solution\\TwinBackend.Repository\\Data\\DataSeed\\Python_Questions.csv", "D:\\Collage\\4th_year\\GP\\Twin\\TwinBackend.Solution\\TwinBackend.Repository\\Data\\DataSeed\\SQL_Questions.csv" };
            //    foreach (var file in files)
            //    {
            //        using (var reader = new StreamReader(file))
            //        {
            //            using (var csvReader = new CsvReader(reader, CultureInfo.InvariantCulture))
            //            {
            //                var records = csvReader.GetRecords<QuestionParamsDTO>().ToList();
            //                for (int i = 0; i < records.Count(); i++)
            //                {
            //                    var newQuestion = new Question();
            //                    newQuestion.Stem = records[i].Title;
            //                    newQuestion.QuestionCategory = records[i].Category;
            //                    newQuestion.QuestionDifficulity = records[i].Level;
            //                    newQuestion.QuestionWeigth = 1;
            //                    for (int j = 0; j < 4; j++)
            //                    {
            //                        var newAnswer = new QuestionChoices();
            //                        if ((j == 0) && (records[i].Choice_1 != null))
            //                        {
            //                            newAnswer.Answer = records[i].Choice_1;
            //                            if (records[i].Correct_Answer == "A")
            //                            {
            //                                newAnswer.IsCorrect = true;
            //                            }
            //                            newQuestion.Answers.Add(newAnswer);
            //                        }
            //                        else if ((j == 1) && (records[i].Choice_2 != null))
            //                        {
            //                            newAnswer.Answer = records[i].Choice_2;
            //                            if (records[i].Correct_Answer == "B")
            //                            {
            //                                newAnswer.IsCorrect = true;
            //                            }
            //                            newQuestion.Answers.Add(newAnswer);
            //                        }
            //                        else if ((j == 2) && (records[i].Choice_3 != null))
            //                        {
            //                            newAnswer.Answer = records[i].Choice_3;
            //                            if (records[i].Correct_Answer == "C")
            //                            {
            //                                newAnswer.IsCorrect = true;
            //                            }
            //                            newQuestion.Answers.Add(newAnswer);
            //                        }
            //                        else if ((j == 3) && (records[i].Choice_4 != null))
            //                        {
            //                            newAnswer.Answer = records[i].Choice_4;
            //                            if (records[i].Correct_Answer == "D")
            //                            {
            //                                newAnswer.IsCorrect = true;
            //                            }
            //                            newQuestion.Answers.Add(newAnswer);
            //                        }
            //                    }
            //                    await questionRepository.Add(newQuestion);

            //                }
            //                var count = questionRepository.SaveChanges();
            //                Console.WriteLine("num of records");
            //                Console.WriteLine(count);
            //            }
            //        }
            //    }
            //    //questionRepository.SaveChanges();
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine($"Error: {ex.Message}");
            //}


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();



            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            using(var scope = app.Services.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                var roles = new[] { "Admin", "Developer", "Client" };

                foreach (var role in roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        await roleManager.CreateAsync(new IdentityRole(role));
                    }
                }

                
            }

            app.Run();
        }
    }
}
