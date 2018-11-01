using System;
using System.Collections.Generic;
using System.Text;
using TestDoServer.Util;
using Xunit;

namespace TestDoServerTests.Util
{
    public class AngularImportsSorterTest
    {
        [Fact]
        public void CanSortRandomListContainingValued()
        {
            var exampleImportsList = new List<string>{
                "polyfills.3f11bf9959f924754af3.js",
                "runtime.ec2944dd8b20ec099bf3.js",
                "xbim-product-type.debug.js",
                "main.f99bbc906772b592f801.js",
                "scripts.964991be540799a9fd15.js",
                "webgl-utils.js"
            };

            exampleImportsList.Sort(AngularImportsSorter.CompareImports);

            Assert.StartsWith("runtime", exampleImportsList[0]);
            Assert.StartsWith("polyfills", exampleImportsList[1]);
            Assert.StartsWith("scripts", exampleImportsList[2]);
            Assert.StartsWith("main", exampleImportsList[3]);
        }

        [Fact]
        public void CanSortAdditionsExpectedInCorrectOrder()
        {
            var exampleImportsList = new List<string>{
                "xbim-product-type.debug.js",
                "runtime.ec2944dd8b20ec099bf3.js",
                "polyfills.3f11bf9959f924754af3.js",
                "scripts.964991be540799a9fd15.js",
                "main.f99bbc906772b592f801.js",
            };

            exampleImportsList.Sort(AngularImportsSorter.CompareImports);

            Assert.StartsWith("runtime", exampleImportsList[0]);
            Assert.StartsWith("polyfills", exampleImportsList[1]);
            Assert.StartsWith("scripts", exampleImportsList[2]);
            Assert.StartsWith("main", exampleImportsList[3]);
        }

        [Fact]
        public void CanSortOnlyExpectedInCorrectOrder()
        {
            var exampleImportsList = new List<string>{
                "runtime.ec2944dd8b20ec099bf3.js",
                "polyfills.3f11bf9959f924754af3.js",
                "scripts.964991be540799a9fd15.js",
                "main.f99bbc906772b592f801.js",
            };

            exampleImportsList.Sort(AngularImportsSorter.CompareImports);

            Assert.StartsWith("runtime", exampleImportsList[0]);
            Assert.StartsWith("polyfills", exampleImportsList[1]);
            Assert.StartsWith("scripts", exampleImportsList[2]);
            Assert.StartsWith("main", exampleImportsList[3]);

        }

        [Fact]
        public void CanSortCorrectlyMissingSomeExpected()
        {
            var exampleImportsList = new List<string>{
                "scripts.964991be540799a9fd15.js",
                "main.f99bbc906772b592f801.js",
            };

            exampleImportsList.Sort(AngularImportsSorter.CompareImports);

            Assert.StartsWith("scripts", exampleImportsList[0]);
            Assert.StartsWith("main", exampleImportsList[1]);
        }
    }
}
