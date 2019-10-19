import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernsService, ITavern } from '../../../taverns/taverns.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  userName = '';
  password = '';
  roles = ['Admin', 'Manager'];
  selectedRole = 'Admin';
  taverns: ITavern[];
  tavernId = 0;
  tavernName = '';

  constructor(private router: Router, private authService: AuthService, private tavernsService: TavernsService) {}

  save(): void {
    const user = {
      UserName: this.userName,
      Password: this.password,
      RoleId: 0,
      Tavern: {
        Id: (this.selectedRole == 'Manager' ? this.tavernId : 0),
        TavernName: (this.selectedRole == 'Admin' ? this.tavernName : '')
      }
    };
    this.authService.create(user).subscribe(
      (response) => {
          if (response.success) {
              console.log('user created');
              this.router.navigateByUrl('/login');
          }
      },
      (error) => {
          console.log('create failed');
      },
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.tavernsService.getTaverns().subscribe((taverns) => (this.taverns = taverns));
  }

}
