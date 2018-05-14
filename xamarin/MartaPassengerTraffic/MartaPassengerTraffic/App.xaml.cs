using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Net.Http;
using System.Threading.Tasks;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace MartaPassengerTraffic
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            MainPage = new MainPage();
        }

        protected override void OnStart()
        {
			// Handle when your app starts
			var client = new HttpClient();
			Task<HttpResponseMessage> a = client.GetAsync("https://www.google.com");
			a.ContinueWith((resA) =>
			{
				Task<string> b = resA.Result.Content.ReadAsStringAsync();
				b.ContinueWith((resB) => Console.WriteLine(resB.Result));
			});
        }
        
        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
