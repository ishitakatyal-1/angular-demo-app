import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MsalService } from '@azure/msal-angular'
import { HttpClient } from '@angular/common/http'

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admin;
  constructor(
    private authService: AuthService, private router: Router, private msalServie: MsalService, private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT).toPromise().then(admin => { this.admin = admin });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
