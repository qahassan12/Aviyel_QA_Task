let rowsLength

describe('Data Driven', () => {
    before(()=>{
        cy.task('readXlsx',{file:'cypress/fixtures/data.xlsx',sheet:'admin'}).then((rows)=>{
            rowsLength=rows.length;
            cy.writeFile('cypress/fixtures/xlsxData.json',{rows})
        })
       
    })
  it('data driven login',()=>{
      cy.fixture('xlsxData').then((data)=>{
        
          cy.request({
              "method":data.rows[1].method,
              "url":data.rows[1].url
          }).then((res)=>{
            expect(res.status).to.equal(data.rows[1].status)
          })
          
          cy.request({
            "method":data.rows[2].method,
            "url":data.rows[2].url
        }).then((res)=>{
           let date=data.rows[0].checkin
            let checkin=date.substr(0,10)
            let date2=data.rows[0].checkout
             let checkout=date2.substr(0,10)
          expect(res.status).to.equal(data.rows[2].status)
          expect(res.body.firstname).to.equal(data.rows[0].firstname)
          expect(res.body.lastname).to.equal(data.rows[0].lastname)
          expect(res.body.totalprice).to.equal(data.rows[0].totalprice)
          expect(res.body.depositpaid).to.equal(data.rows[0].depositpaid)
          expect(res.body.bookingdates.checkin).to.equal(checkin)
          expect(res.body.bookingdates.checkout).to.equal(checkout)

          
        })
        cy.request({
            'method':data.rows[3].method,
            'url':data.rows[3].url,
            body:{
                'firstname':data.rows[1].firstname,
                'lastname':data.rows[1].lastname,
                'totalprice':data.rows[1].totalprice,
                'depositpaid':data.rows[1].depositpaid,
                'bookingdates':{
                  'checkin':data.rows[1].checkin,
                  'checkout':data.rows[1].checkout
                },
                'additionalneeds':data.rows[0].additionalneeds
            }
        }).then((res)=>{
          let date1=data.rows[1].checkin
          let checkin=date1.substr(0,10)
          let date2=data.rows[1].checkout
          let checkout=date2.substr(0,10)
          expect(res.status).to.eq(data.rows[3].status)
          expect(res.body.booking).has.property('firstname',data.rows[1].firstname)
          expect(res.body.booking).has.property('lastname',data.rows[1].lastname)
          expect(res.body.booking).has.property('totalprice',data.rows[1].totalprice)
          expect(res.body.booking).has.property('depositpaid',data.rows[1].depositpaid)
          expect(res.body.booking.bookingdates).has.property('checkin',checkin)
          expect(res.body.booking.bookingdates).has.property('checkout',checkout)
          expect(res.body.booking).has.property('additionalneeds',data.rows[0].additionalneeds)
        }).then((res)=>{
          cy.log(res.body.bookingid)
          const id=res.body.bookingid
          cy.request({
            'method':data.rows[0].method,
            'url':data.rows[0].url,failOnStatusCode: false,
            headers:{
              'content-type':'application/json',
              'Accept':'application/json',
              'authorization':'Basic YWRtaW46cGFzc3dvcmQxMjM=',
              
            },
            
         body:{
              username:'admin',
              password:'password123'
         }
           
          }).then((res)=>{
            cy.log(res.body)
          
            const token=res.body
            
            cy.request({  
              'method':data.rows[4].method,
              'url':data.rows[4].url+id,failOnStatusCode: false,
              headers:{
                'content-type':'application/json',
              'Accept':'application/json',
              'authorization':'Basic YWRtaW46cGFzc3dvcmQxMjM=',
              },
              body:{
                'firstname':data.rows[2].firstname,
                'lastname':data.rows[2].lastname,
                'totalprice':data.rows[2].totalprice,
                'depositpaid':data.rows[2].depositpaid,
                'bookingdates':{
                  'checkin':data.rows[2].checkin,
                  'checkout':data.rows[2].checkout
                },
                'additionalneeds':data.rows[0].additionalneeds
              }
            }).then((res)=>{
              let date=data.rows[2].checkin
              let checkin=date.substr(0,10)
              let date2=data.rows[2].checkout
               let checkout=date2.substr(0,10)
              cy.log(id)
              expect(res.body).has.property('firstname',data.rows[2].firstname)
          expect(res.body).has.property('lastname',data.rows[2].lastname)
          expect(res.body).has.property('totalprice',data.rows[2].totalprice)
          expect(res.body).has.property('depositpaid',data.rows[2].depositpaid)
          expect(res.body.bookingdates).has.property('checkin',checkin)
          expect(res.body.bookingdates).has.property('checkout',checkout)
          expect(res.body).has.property('additionalneeds',data.rows[0].additionalneeds)
             
            }).then((res)=>{
              expect(res.status).to.eq(data.rows[4].status)
          cy.request({
            'method':data.rows[0].method,
            'url':data.rows[0].url,
            body:{
              'username':data.rows[0].username,
              'password':data.rows[0].password
            },
           
          }).then(()=>{
            
              cy.request({
                'method':data.rows[5].method,
                'url':data.rows[5].url+id,failOnStatusCode: false,
                headers:{
                  'content-type':'application/json',
                  'Authorization':'Basic YWRtaW46cGFzc3dvcmQxMjM=',
                 
                }
              })
            }).then((res)=>{
                cy.log(res.body)
                expect(res.status).to.eq(data.rows[5].status)
                cy.request({
                        'method':data.rows[6].method,
                        'url':data.rows[6].url
                      }).then((res)=>{
                        expect(res.status).to.eq(data.rows[6].status)
                        expect(res.body).to.eq(data.rows[0].response)
                      })
                  
                  
          
              })
            })
          })
      
        })
       
          
      })
  })
})
