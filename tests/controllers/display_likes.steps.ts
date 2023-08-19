import { defineFeature, loadFeature } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import TestRepository from "../../src/repositories/test.repository";
import { di } from "../../src/di";

const feature = loadFeature('tests/features/mostrar_Curtidas_e_Criadores.feature')
const request = supertest(app)

defineFeature(feature, (test)=>{
    let mockTestRepository : TestRepository
    let response : supertest.Response
    beforeEach(()=>{
        mockTestRepository = di.getRepository<TestRepository>(TestRepository)
    })

    test('Visualizar todas as curtidas com 1 ou mais curtidas', ({given, when, then})=>{
//              que eu sou um usuário logado no sistema com nome
        given(/^que eu sou um usuário logado no sistema com nome "(.*)" $/, async(nome)=>{
        
            const existTest = await mockTestRepository.getTest(nome)    
        
            if(existTest){
                await mockTestRepository.deleteTest(nome)    
            }
        })
        when(/^eu faço uma requisição GET "(.*)" $/,async(endPoint)=>{
     
        response = await request.get(endPoint)
        
        })

        then(/^é retornado um JSON com corpo "(.*)" $/,async(body)=>{
     
            expect(response.body.data).toEqual(body)
            
            })
    })
})


