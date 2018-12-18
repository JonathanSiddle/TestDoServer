using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.IdentityModel.Tokens.Jwt;
using TestDoServer.DAL;
using TestDoServer.Repository;

namespace TestDoServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // work-in-progress see: http://docs.identityserver.io/en/latest/quickstarts/3_interactive_login.html
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = "Cookies";
                options.DefaultChallengeScheme = "oidc";
            })
            .AddCookie("Cookies")
            .AddOpenIdConnect("oidc", options =>
            {
                options.SignInScheme = "Cookies";
                options.Authority = "https://localhost:5001";
                //options.RequireHttpsMetadata = true;
                options.ClientId = "mvc";
                options.ClientSecret = "secret";
                options.ResponseType = "code id_token";
                options.SaveTokens = true;
                options.Scope.Add("openid");
                options.Scope.Add("profile");
                options.Scope.Add("offline_access");
            });
            //services.Configure<CookiePolicyOptions>(options =>
            //{
            //    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            //    options.CheckConsentNeeded = context => true;
            //    options.MinimumSameSitePolicy = SameSiteMode.None;
            //});

            //services.AddAuthentication("Bearer")
            //    .AddIdentityServerAuthentication(options =>
            //    {
            //        options.Authority = "https://localhost:5001";
            //        options.RequireHttpsMetadata = true;
            //        options.ApiName = "api1";
            //    });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultScheme = "Cookies";
            //    options.DefaultChallengeScheme = "oidc";
            //})
            //.AddCookie("Cookies")
            //.AddOpenIdConnect("oidc", options =>
            //{
            //    options.SignInScheme = "Cookies";

            //    options.Authority = "https://localhost:5001";
            //    options.RequireHttpsMetadata = true;
            //    options.ClientId = "mvc";
            //    options.SaveTokens = true;
            //});

            //TODO: Fix this in a real application
            var connection = @"Server = localhost; User Id = root; Password = admin; Database = TestDo";

            //services.AddDbContext<TestDoContext>
            //    (options => options.UseSqlServer(connection));
            services.AddDbContext<TestDoContext>
                (options => options.UseMySql(connection));

            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy", builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
                });
            });
            //services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            /*
             * Dev specific config here...
            */
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("MyPolicy");
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            //set up database connection 

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseStaticFiles();
            //app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

        }
    }
}
