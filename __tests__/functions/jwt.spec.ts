import {parseJwt} from "@/functions/jwt";

it('parses jwt', () => {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNGTDZUZXN0X2xYZ0RHN1drSkphRVE3azd0Q0dzSEdua2xscy1vT3FqeUEifQ.eyJ1cGRhdGVkX2F0IjoiMjAyMy0wNi0wNFQyMDowMTo0Mi44NDNaIiwiYWRkcmVzcyI6eyJjb3VudHJ5IjpudWxsLCJwb3N0YWxfY29kZSI6bnVsbCwicmVnaW9uIjpudWxsLCJmb3JtYXR0ZWQiOm51bGx9LCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV9udW1iZXIiOm51bGwsImxvY2FsZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImJpcnRoZGF0ZSI6bnVsbCwiZ2VuZGVyIjoiTSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZW1haWwiOm51bGwsIndlYnNpdGUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJvZmlsZSI6bnVsbCwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJuaWNrbmFtZSI6IkplZmYgVGlhbiIsIm1pZGRsZV9uYW1lIjpudWxsLCJmYW1pbHlfbmFtZSI6bnVsbCwiZ2l2ZW5fbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwic3ViIjoiNjIwNGRlMGE0OWMzMTg3NGI5N2Q0NzBiIiwiZXh0ZXJuYWxfaWQiOm51bGwsInVuaW9uaWQiOiJvTExVZHN5eVZMY2pkeEZYaU9WMnBaWXVPZFIwIiwidXNlcm5hbWUiOiJ3ZWNoYXRfNmVtMWc0IiwiZGF0YSI6eyJ0eXBlIjoidXNlciIsInVzZXJQb29sSWQiOiI2MjAwOTdiNjlhOWRhYjVlOTY3ZDBjNDQiLCJhcHBJZCI6IjYyMDA5N2I3ZjdjOTY0MjEwYjhmNzQzMSIsImlkIjoiNjIwNGRlMGE0OWMzMTg3NGI5N2Q0NzBiIiwidXNlcklkIjoiNjIwNGRlMGE0OWMzMTg3NGI5N2Q0NzBiIiwiX2lkIjoiNjIwNGRlMGE0OWMzMTg3NGI5N2Q0NzBiIiwicGhvbmUiOm51bGwsImVtYWlsIjpudWxsLCJ1c2VybmFtZSI6IndlY2hhdF82ZW0xZzQiLCJ1bmlvbmlkIjoib0xMVWRzeXlWTGNqZHhGWGlPVjJwWll1T2RSMCIsIm9wZW5pZCI6Im9kckhONHAxVU1XUmRRZk1LNHhtOWR0UVh2ZjgiLCJjbGllbnRJZCI6IjYyMDA5N2I2OWE5ZGFiNWU5NjdkMGM0NCJ9LCJ1c2VycG9vbF9pZCI6IjYyMDA5N2I2OWE5ZGFiNWU5NjdkMGM0NCIsImF1ZCI6IjYyMDA5N2I3ZjdjOTY0MjEwYjhmNzQzMSIsImV4cCI6MTY4NzExODUwNiwiaWF0IjoxNjg1OTA4OTA2LCJpc3MiOiJodHRwczovL3VuaWhlYXJ0LmF1dGhpbmcuY24vb2lkYyJ9.TiJem4WZAeRKIwis0L7KBCVseaulSI4o5z_fYeJ5IVuWRhTe9gIIckThtnivbk2ECFPV1nO1-pS1oNw_N1cXupcklgh5YyhSoyEtqbaoKjulGC2ZeAj7_4JSqoY57pL-9MktXoW5sH0wlEBnMtYAAoKTgkeB91J1C73CezpfFfFbdb32-e0MUNqxwrj4cKyFfZ6_WditRzuZN235xpO7PqiB8EGCEppOhkE-JBgPTijUnu34z7HXL4FzQXW5TyKYv3kulLNmItYlYEDEWZocYXBI47heXMaPbSdMkMHXuSXxm1BDR4JPp9uxvnw9WPkSN-hyHsZaKok3AkBujDxAFg'

    expect(parseJwt(token)).toEqual({
        "address": {
            "country": null,
            "formatted": null,
            "postal_code": null,
            "region": null
        },
        "aud": "620097b7f7c964210b8f7431",
        "birthdate": null,
        "data": {
            "_id": "6204de0a49c31874b97d470b",
            "appId": "620097b7f7c964210b8f7431",
            "clientId": "620097b69a9dab5e967d0c44",
            "email": null,
            "id": "6204de0a49c31874b97d470b",
            "openid": "odrHN4p1UMWRdQfMK4xm9dtQXvf8",
            "phone": null,
            "type": "user",
            "unionid": "oLLUdsyyVLcjdxFXiOV2pZYuOdR0",
            "userId": "6204de0a49c31874b97d470b",
            "userPoolId": "620097b69a9dab5e967d0c44",
            "username": "wechat_6em1g4"
        },
        "email": null,
        "email_verified": false,
        "exp": 1687118506,
        "external_id": null,
        "family_name": null,
        "gender": "M",
        "given_name": null,
        "iat": 1685908906,
        "iss": "https://uniheart.authing.cn/oidc",
        "locale": null,
        "middle_name": null,
        "name": null,
        "nickname": "Jeff Tian",
        "phone_number": null,
        "phone_number_verified": false,
        "picture": "https://files.authing.co/authing-console/default-user-avatar.png",
        "preferred_username": null,
        "profile": null,
        "sub": "6204de0a49c31874b97d470b",
        "unionid": "oLLUdsyyVLcjdxFXiOV2pZYuOdR0",
        "updated_at": "2023-06-04T20:01:42.843Z",
        "username": "wechat_6em1g4",
        "userpool_id": "620097b69a9dab5e967d0c44",
        "website": null,
        "zoneinfo": null
    })
})
