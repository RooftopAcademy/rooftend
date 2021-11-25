"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
let Profile = class Profile {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        unsigned: true,
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'first_name',
        type: 'character varying',
        length: 100
    }),
    __metadata("design:type", String)
], Profile.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'last_name',
        type: 'character varying',
        length: 100
    }),
    __metadata("design:type", String)
], Profile.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'identification_type',
        type: 'character varying',
        length: 5
    }),
    __metadata("design:type", String)
], Profile.prototype, "identificationType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'identification_number',
        type: 'character varying',
        length: 10
    }),
    __metadata("design:type", String)
], Profile.prototype, "identificationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id'
    }),
    __metadata("design:type", Number)
], Profile.prototype, "userId", void 0);
Profile = __decorate([
    (0, typeorm_1.Entity)({
        name: 'profiles'
    })
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profile.entity.js.map