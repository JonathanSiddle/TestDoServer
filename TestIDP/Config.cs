using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestIDP
{
    public class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "My API")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                //new Client
                //{
                //    ClientId = "client",
                //    AllowedGrantTypes = GrantTypes.ClientCredentials,
                //    ClientSecrets =
                //    {
                //        new Secret("secret".Sha256())
                //    },
                //    AllowedScopes = { "api1" }
                //},
                //new Client
                //{
                //    ClientId = "ro.client",
                //    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                //    ClientSecrets =
                //    {
                //        new Secret("secret".Sha256())
                //    },
                //    AllowedScopes = { "api1" }
                //},
                new Client
                {
                    ClientId = "mvc",
                    ClientName = "MVC Client",
                    AllowedGrantTypes = GrantTypes.HybridAndClientCredentials,

                    RequireConsent = false,

                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    RedirectUris           = { "https://localhost:5002/signin-oidc" },
                    PostLogoutRedirectUris = { "https://localhost:5002/signout-callback-oidc" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                    },
                    AllowOfflineAccess = true
                }
            };
        }

        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "",
                    Username = "Jon",
                    Password = "password"
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }
    }
}
