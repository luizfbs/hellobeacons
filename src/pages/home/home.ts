import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  logs = [];
  
  constructor(platform: Platform, public navCtrl: NavController, private ibeacon: IBeacon) {
	this.addLog('Started!');
	
	if(platform.is('cordova')) {
		// Request permission to use location on iOS
		this.ibeacon.requestAlwaysAuthorization();
		
		// create a new delegate and register it with the native layer
		let delegate = this.ibeacon.Delegate();
		
		if(delegate === null) {
			this.addLog('IBeacon plugin was not loaded..');
			return;
		}
		
		// Subscribe to some of the delegate's event handlers
		delegate.didRangeBeaconsInRegion()
		  .subscribe(
			data => this.addLog('didRangeBeaconsInRegion: ' + JSON.stringify(data)),
			error => console.error()
		  );
		delegate.didStartMonitoringForRegion()
		  .subscribe(
			data => this.addLog('didStartMonitoringForRegion: ' + JSON.stringify(data)),
			error => console.error()
		  );
		delegate.didEnterRegion()
		  .subscribe(
			data => {
			  this.addLog('didEnterRegion: ' + JSON.stringify(data));
			}
		  );

		let beaconRegion1 = this.ibeacon.BeaconRegion('deskBeacon','ebefd083-70a2-47c8-9837-e7b5634df599', 20000, 3, true);
		this.ibeacon.startMonitoringForRegion(beaconRegion1)
			.then(
			() => this.addLog('Native layer recieved the request to monitoring'),
			error => this.addLog('Native layer failed to begin monitoring: ' + JSON.stringify(error))
			);  
			
		let beaconRegion2 = this.ibeacon.BeaconRegion('deskBeacon','ebefd083-70a2-47c8-9837-e7b5634df599', 20000, 5, true);
		this.ibeacon.startMonitoringForRegion(beaconRegion2)
			.then(
			() => this.addLog('Native layer recieved the request to monitoring'),
			error => this.addLog('Native layer failed to begin monitoring: ' + JSON.stringify(error))
			);  
    } else {
		this.addLog('Cordova not loaded =/');	
	}	
  }
  
  addLog(message) {
	  this.logs.push(new Date().toLocaleString('pt-BR') + ": " + message)
  }
}
