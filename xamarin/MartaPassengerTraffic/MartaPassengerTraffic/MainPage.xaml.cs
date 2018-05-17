using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using System.Net.Http;

namespace MartaPassengerTraffic
{
	public partial class MainPage : ContentPage
	{
		public MainPage()
		{
			InitializeComponent();
		}

		async void Login()
		{
			var client = ((App)(Application.Current)).MyHttpClient;
			Task<HttpResponseMessage> a = client.GetAsync("http://localhost:3000/stations");
			a.ContinueWith((resA) =>
			{
				Console.WriteLine("Got the results");
				Console.WriteLine(resA.Status);
				Task<string> b = resA.Result.Content.ReadAsStringAsync();
				b.ContinueWith((resB) =>
				{
					Console.WriteLine(resB.Result);
				});
			});
			var newPage = new LandingPage();
			var data = new TestData
			{
				Username = usernameEntry.Text
			};
			newPage.BindingContext = data;
			Console.WriteLine(((TestData)newPage.BindingContext).Username);
			await Navigation.PushAsync(newPage);
		}
	}

	class TestData
	{
		public string Username { get; set; }

	}

}