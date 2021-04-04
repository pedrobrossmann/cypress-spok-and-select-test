class Request {

    // Verbo >> Recurso

    getPing() {
        return cy.request({
            method: 'GET',
            url: 'ping'
        })
    }

    getBooking() {
        return cy.request({
            method: 'GET',
            url: '/booking/5',
        })
    }

    postBooking() {
        return cy.request({
            method: 'POST',
            url: '/booking',
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        })
    }

    updateBookingWithoutToken(response) {
        const bookingId = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${bookingId}`,
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 599,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false,
        })
    }

    updateBooking(response) {
        const bookingId = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${bookingId}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 599,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false,
        })
    }

    updateBookingInvalidToken(response) {
        const bookingId = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${bookingId}`,
            headers: {
                Cookie: `token=99999999999999999`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 599,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false,
        })
    }

    updateNonExistentBooking() {
    
        return cy.request({
            method: 'PUT',
            url: `booking/${99999}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 599,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false,
        })
    }

    deleteBooking(response) {
        const bookingId = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${bookingId}`,
            failOnStatusCode: false,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            
        })
    }

    deleteNonexistentBooking() {
        return cy.request({
            method: 'DELETE',
            url: `booking/${9999999}`,
            failOnStatusCode: false,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            
        })
    }

    deleteBookingWithoutToken(response) {
        const bookingId = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${9999999}`,
            failOnStatusCode: false,
            
        })
    }

    deleteBookingInvalidToken(response) {
        const bookingId = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${9999999}`,
            failOnStatusCode: false,
            headers: {
                Cookie: `token=99999999999999`
            },
            
        })
    }

    postAuth() {
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username": "admin",
                "password": "password123"
            }
        })
    }

    doAuth() {
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token;
            Cypress.env('token', token)
        })
    }
}

export default new Request();