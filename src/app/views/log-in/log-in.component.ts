import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  user: string;
  password: string;
  users: User[];

  constructor(private userService: UserService, private router: Router) {
    this.user = '';
    this.password = '';
    // TODO: Once the fix in back had solved, use data from service
    // Users only have an account if the are clients of the center, so this is just for testing
    this.users = [
      { user: 'admin', password: 'admin$$', type: 'admin' },
      { user: 'aux', password: 'aux$$', type: 'mod' },
      { user: 'user', password: 'user$$', type: '1' },
    ];
  }

  login() {
    /*
    TODO: Uncomment when back were fixed
    this.userService.getAll().subscribe((data)=>{
      let users = data.filter(userDB => {
        if(this.user == userDB.user && this.password == userDB.password){
          return userDB;
        }
      });
      if(users.length != 0){
        this.userService.showMessage('Logeado correctamente',true);
        this.router.navigate(['/redirect],skipLocationChange:true);
      }else{
        this.userService.showMessage(['Logging incorrecto',false]);
      }
    });
    */

    let users = this.users.filter((elemento) => {
      if (this.user == elemento.user && this.password == elemento.password) {
  
        return elemento;
      }
    });

    if (users.length != 0) {
      if (users[0].type == 'admin' || 'mod') {
        alert('Admin logeado con exito');
        this.router.navigate(['redirect/']);
      } else {
        alert('Usuario logeado con exito');
        this.router.navigate(['userView/']);
      }
    } else {
      alert('Loggin incorrecto');
    }
  }

  ngOnInit(): void {}
}
