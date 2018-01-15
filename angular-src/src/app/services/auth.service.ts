import {Injectable} from '@angular/core';
import {AuthenticationService} from '../swagger-api/api/authentication.service';
import {RegisterParams} from '../swagger-api/model/registerParams';
import {RegisterResponse} from '../swagger-api/model/registerResponse';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

    constructor(private _authenticationServiceApi: AuthenticationService) {
    }

    registerUser(newUser: RegisterParams): Observable<RegisterResponse> {
        return this._authenticationServiceApi.registerUser(newUser)
            .map((response: RegisterResponse) => {
                return response;
            })
    }

}
