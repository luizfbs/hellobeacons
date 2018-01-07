import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  logs = ['Started!'];
  
  constructor(public navCtrl: NavController, private ibeacon: IBeacon) {

	// Request permission to use location on iOS
	this.ibeacon.requestAlwaysAuthorization();
	// create a new delegate and register it with the native layer
	let delegate = this.ibeacon.Delegate();

	if(delegate === null || delegate === undefined) {
		alert("Ops, Beacons plugin not working...");
		return;
	}
	
	// Subscribe to some of the delegate's event handlers
	delegate.didRangeBeaconsInRegion()
	  .subscribe(
		data => this.logs.push('didRangeBeaconsInRegion: ' + JSON.stringify(data)),
		error => console.error()
	  );
	delegate.didStartMonitoringForRegion()
	  .subscribe(
		data => this.logs.push('didStartMonitoringForRegion: ' + JSON.stringify(data)),
		error => console.error()
	  );
	delegate.didEnterRegion()
	  .subscribe(
		data => {
		  this.logs.push('didEnterRegion: ' + JSON.stringify(data));
		}
	  );

	let beaconRegion1 = this.ibeacon.BeaconRegion('deskBeacon','ebefd083-70a2-47c8-9837-e7b5634df599', 20000, 3, true);
	this.ibeacon.startMonitoringForRegion(beaconRegion1)
		.then(
		() => this.logs.push('Native layer recieved the request to monitoring'),
		error => this.logs.push('Native layer failed to begin monitoring: ' + JSON.stringify(error))
		);  
		
	let beaconRegion2 = this.ibeacon.BeaconRegion('deskBeacon','ebefd083-70a2-47c8-9837-e7b5634df599', 20000, 5, true);
	this.ibeacon.startMonitoringForRegion(beaconRegion2)
		.then(
		() => this.logs.push('Native layer recieved the request to monitoring'),
		error => this.logs.push('Native layer failed to begin monitoring: ' + JSON.stringify(error))
		);  
  }
}
