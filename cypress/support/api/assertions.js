class Assertions {
    shouldHaveStatus(response, status){
        expect(response.status, `status is ${status}`).eq(status)
    }

    validateContractOf(response, schemas){
        return cy.wrap(response.body).should(
            schemas
        )
    }

    bookingIdIsNotNull(response){
        expect(response.body.bookingid, 'bookingid exists').not.null
    }

    shouldHaveDefaultHeader(response){
        expect(response.headers).to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express'
        })
    }

    shouldHaveContentTypeAppJson(response){
        expect(response.headers).to.include({
            'content-type': 'application/json; charset=utf-8',       })
    }

    shouldDuractionBeFast(response){
        expect(response.duration, 'duraction').lessThan(900)
    }
}

export default new Assertions()