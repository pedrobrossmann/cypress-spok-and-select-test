/// <reference types="cypress" />

import req from '../support/api/request'
import schemas from '../support/api/schemas'
import assetions from '../support/api/assertions'

context('Booking', () => {
    before(() =>{
        req.doAuth()
    })
    it('Validar contrato do get da booking @contract', () => {

        req.getBooking().then(getBookingResponse => {
            assetions
                .validateContractOf(getBookingResponse, schemas.getBookingSchema())
        })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assetions.shouldHaveStatus(postBookingResponse, 200)
            assetions.shouldHaveDefaultHeader(postBookingResponse)
            assetions.bookingIdIsNotNull(postBookingResponse)
            assetions.shouldHaveContentTypeAppJson(postBookingResponse)
            assetions.shouldDuractionBeFast(postBookingResponse)
        })
    })

    it('Tentar alterar reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithoutToken(postBookingResponse).then(putResponse => {
                assetions.shouldHaveStatus(putResponse, 403)
            })
        })
    })

    it('Tentar alterar reserva com token invalido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingInvalidToken(postBookingResponse).then(putResponse => {
                assetions.shouldHaveStatus(putResponse, 403)
            })
        })
    })

    it('Alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putResponse => {
                assetions.shouldHaveStatus(putResponse, 200)
            })
        })
    })

    it('Tentar alterar uma reserva inexistente @functional', () => {
        req.updateNonExistentBooking().then(updateResponse => {
                assetions.shouldHaveStatus(updateResponse, 405)
            })
      
    })

    it('Exclui uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deletResponse => {
                assetions.shouldHaveStatus(deletResponse, 201)
            })
        })
    })

    it('Tenta excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteNonexistentBooking(postBookingResponse).then(deletResponse => {
                assetions.shouldHaveStatus(deletResponse, 405)
            })
        })
    })

    it('Tenta excluir uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithoutToken(postBookingResponse).then(deletResponse => {
                assetions.shouldHaveStatus(deletResponse, 403)
            })
        })
    })

    it.only('Tenta excluir uma reserva com token invalido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingInvalidToken(postBookingResponse).then(deletResponse => {
                assetions.shouldHaveStatus(deletResponse, 403)
            })
        })
    })
});