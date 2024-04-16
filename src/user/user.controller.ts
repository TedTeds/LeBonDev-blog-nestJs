import { Controller, Get, Render, Post, Body, Redirect, UseInterceptors, ClassSerializerInterceptor, Session } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { UserService } from './user.service';
import { LogintoDto } from './dtos/loginDto';
import { error } from 'console';

@Controller('user')
export class UserController { 
    
    constructor(private readonly userService : UserService){}

    @Get("/signup")
    @Render("user/signup")
    getSignup() { }

    @Get("/login")
    @Render("user/login")
    getLogin() { }

    @Post("/signup")
    @Redirect("/user/login")
   async postSignup(@Body() body: SignupDto) {
       return {message : await this.userService.postSignup(body)}
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Post("/login")
    @Redirect("/")
    async posLogin(@Body() body: LogintoDto, @Session() session : Record<string, any>){
        const user = await this.userService.postLogin(body)
        session.user = user 
        session.connected = true
        
    }
@Post("/logout")
@Redirect("login")
postLogout(@Session() session : Record<string, any>){
session.destroy(err=>{});

}
}