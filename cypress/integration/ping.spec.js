/// <reference types="cypress" />

import req from '../support/api/request'
import assertions from '../support/api/assertions'

context('Ping', () => {
    
    it('Valida se a aplicação está no ar @healtcheck', () => {
        req.getPing().then(getPingResponse => {
            assertions.shouldHaveStatus(getPingResponse, 201)
        })
    });
});