using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestDoServer.Util
{
    public static class AngularImportsSorter
    {
        public static int CompareImports(string x, string y)
        {
            if (x.CompareTo(y) == 0) return 0;

            if (x.Contains("runtime")) return -1;
            if (y.Contains("runtime")) return 1;

            if (x.Contains("polyfills")) return -1;
            if (y.Contains("polyfills")) return 1;

            if (x.Contains("scripts")) return -1;
            if (y.Contains("scripts")) return 1;

            if (x.Contains("main")) return -1;
            if (y.Contains("main")) return 1;

            return x.CompareTo(y);
        }
    }
}
