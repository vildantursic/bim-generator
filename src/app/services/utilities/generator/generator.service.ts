import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';

@Injectable()
export class GeneratorService {

  constructor() { }

  generateTransaction(transactionData): any {
    let Transaction = {
      "checkout": transactionData.checkoutGUID,
      "entity": transactionData.entityGUID,
      "transactionData": []
    }

    for(let i = 0; i < transactionData.chunkNumber; i++) {
      Transaction.transactionData.push({
        "chunk": i,
        "size": +transactionData.chunkSize
      });
    }

    return Transaction
  }

  generateChunks(chunkNumber, chunkSize, failOnChunk = -1) {
    let Chunk = {
      "chunk": chunkNumber,
      "items": []
    }

    for(let i = 0; i < chunkSize; i++) {
      if (chunkNumber === failOnChunk - 1) {
        Chunk.items.push(this.generateItem(true));
      } else {
        Chunk.items.push(this.generateItem());
      }
    }

    return Chunk;
  }

  generateItem(failNum = false): any {

    let Item;

    if (failNum) {
      Item = {
        "category" : [1,2,3],
        "data" : [1,2,3],
        "group" : [1,2,3],
        "guid": [1,2,3],
        "level" : [1,2,3],
        "type" : [1,2,3],
        "object3d": [1,2,3],
        "geometry": [1,2,3],
        "material": [1,2,3],
      }
    } else {
      Item = {
        "category": "Category",
        "group": "Group",
        "guid": this.generateGuid(),
        "level": "Level N",
        "_model": "Model",
        "space": "Space",
        "data": this.generateMetadata(),
        "geometry": this.generateGeometry(),
        // "material": this.generateMaterials(),
        "material": {},
        "object3D": {}
      }
    }

    // let geometryNumber = Math.floor(Math.random() * 30) + 1;

    return Item;
  }

  generateGuid(): string {
    return uuid();
  }

  generateGeometry() {
    let Geometry = {
      "type": "Geometry",
      "model_id": "a_slu_hvc_nord_cntrl",
      "data": {
        "normals" : [],
        "uvs": [],
        "scale": 1.0,
        "visible": true,
        "castShadow": true,
        "receiveShadow": false,
        "doubleSided": true,
        // Vertices -- 80 numbers, from -40000 to 40000
        "vertices": [],
        // Faces -- 120 numbers, from 0 to 30
        "faces": []
      }
    }

    // generate vertices
    for(let i = 0; i<80; i++) {
      let randomNumber = Math.floor(Math.random() * 80001) - 40000;
      Geometry.data.vertices.push(randomNumber);
    }

    // generate faces
    for(let i = 0; i<120; i++) {
      let randomNumber = Math.floor(Math.random() * 30) + 1;
      Geometry.data.faces.push(randomNumber);
    }

    return Geometry;
  }

  generateModelId() {
    let model = [
      "RPC-By01",
      "RPC-By02",
      "RPC-By03",
      "RPC-By04",
      "RPC-By05",
      "RPC-By06"];

    let lvindex = Math.floor((Math.random() * 6) );

    return model[lvindex];
  }
// Generating data
  generateMetadata() {
    let Metadata = {
      "model_id" : this.generateModelId(), //"scoo16",
      "sync_date" : "2016-04-26 19:14:20",
      "create_date" : "2016-04-26 19:14:20",
      "type_guid" : "ae901380917d16d7f174fb14d55dd0d1",
      "CQ_InstanceGUID" : "6e6294dc-6793-4dbe-9af7-8103c5ec1aea",
      "insert_type" : "insert",
      "Revit_guid" : "150e75a9-9ad8-4569-8798-c7328cf87fc1-00288036",
      "Namn" : "D 10",
      "0311 HÄNGNING H/V" : "V",
      "x DÖRRTYP ANVÄNDNING" : "0",
      "0410 DÖRRTYP UTFÖRANDE" : "",
      "0430 DÖRRTYP ÖPPNINGSSÄTT" : "",
      "0511 MÅTT BREDD VÄGGÖPPNING (mm)" : "1010",
      "0512 MÅTT BREDD KYM (mm)" : "990",
      "0521 MÅTT HÖJD VÄGGÖPPNING (mm)" : "2110",
      "0522 MÅTT HÖJD KYM (mm)" : "2090",
      "0600 KLASSINDELNING" : "",
      "0810 FUNKTIONSKRAV VÄRMEISOLERING (W/m²K)" : "",
      "0820 FUNKTIONSKRAV BRANDMOTSTÅND" : "",
      "0830 FUNKTIONSKRAV LJUDISOLERING (dB R'w)" : "",
      "0840 FUNKTIONSKRAV INBROTTSSKYDD" : "",
      "0850 FUNKTIONSKRAV VENTILATION" : "",
      "0910 DÖRRBLADSYTA YTMATERIAL" : "",
      "0920 DÖRRBLADSYTA YTBEHANDLING" : "",
      "1000 GLASÖPPNING" : "",
      "1110 DÖRRBLADSKANT UTFÖRANDE" : "",
      "1120 DÖRRBLADSKANT MATERIAL" : "",
      "1130 DÖRRBLADSKANT YTBEHANDLING" : "",
      "1310 KARM VÄGGTJOCKLEK" : "120",
      "1320 KARM KARmatJUP" : "120",
      "1330 KARM TYP OCH MATERIAL" : "",
      "1340 KARM PÅKÖRNINGSSKYDD" : "",
      "1360 KARM YTBEHANDLING" : "",
      "1410 TRÖSKEL UTFÖRANDE" : "",
      "1420 TRÖSKEL MATERIAL" : "",
      "1610 FODER SMYGLIST SMYGAVTÄCKNING UTFÖRANDE" : "",
      "1620 FODER SMYGLIST SMYGAVTÄCKNING MATERIAL OCH FORM" : "",
      "1630 FODER SMYGLIST SMYGAVTÄCKNING YTBEHANDLING" : "",
      "18 ANMÄRKNING" : "",
      "Inst zon mallfil" : "",
      "Keynote" : "",
      "KOMMENTAR" : "",
      "PM / RevDat" : "",
      "revit_id" : "2656746",
      "0530 DELNING" : "",
      "Modellnamn" : "SCOO16",
      "0210 LITTERA" : "D 10",
      "0321 RUMSNUMMER" : "X641",
      "0322 RUMSNAMN" : "RWC",
      "0331 FRÅN RUMSNUMMER" : "",
      "0332 FRÅN RUMSNAMN" : "",
      "0420 DÖRRTYP KOMPONENT" : "",
      "Level" : "Plan 08",
      "Familj" : "Door-Single-Sweco-Flush",
      "0211 TILLÄGGSLITTERA" : "785",
      "0700 VIRKESKLASS" : "",
      "0100 ÄNDRING" : "",
      "0000 BESKRIVNING" : "",
      "1210 MÅTT" : "",
      "1220 PLACERING" : "",
      "1230 MATERIAL" : "",
      "0312 ANTAL HÄNGNING" : "67H/98V",
      "1350 KARM MATERIAL" : "",
      "1010 GLAS TYP OCH UTFÖRANDE" : "",
      "1020 ÖVRIGT" : "",
      "1810 KULÖR DÖRRBLAD" : "",
      "1820 KULÖR KARM" : "",
      "0320 RUM" : "test",
      "1311 KARM DJUP STD" : "",
      "0313 ANTAL TYP" : "",
      "TYP" : "D 10",
      "Ingår i rapport" : "Ja",
      "BYGGHANDLINGSDATUM" : "",
      "Is Finished" : "",
      "Is New" : "",
      "Notering Entreprenör" : "",
      "1700 BESLAGSKOMBINATION" : "027",
      "0001 BILD" : null,
      "1711 DAGLÅS LÅSHUS" : "Assa 232-50",
      "1712 DAGLÅS SLUTBLECK" : "Assa 1264",
      "1713 DAGLÅS CYLINDERBEHÖR" : "Assa 256-001",
      "1714 DAGLÅS UTRYMNINGSBEHÖR" : "-",
      "1715 DAGLÅS CYLINDER" : "Oval utsida på (G-sida)",
      "1716 TRYCKE/DRAGHANDTAG" : "Slug 08 monterad under cylinderring",
      "1721 EXTRALÅS LÅSHUS" : "-",
      "1722 EXTRALÅS SLUTBLECK" : "-",
      "1723 EXTRALÅS CYLINDERBEHÖR" : "-",
      "1724 EXTRALÅS CYLINDER" : "-",
      "1741 DÖRRSTÄNGARE/DÖRRAUTOMATIK" : "-",
      "1742 SENSORLIST" : "-",
      "1743 ARMBÅGSKONTAKT" : "-",
      "1751 KANTREGEL/SPANJOLETT" : "Fix 560/13 x 2 komplett (A-sida)",
      "1761 KABELÖVERFÖRING" : "-",
      "1771 MAGNETKONTAKT" : "-",
      "1781 PRINCIP FÖR KANALISATION" : "-",
      "1791 BAKKANTSSÄKRING" : "-",
      "1792 ÖVRIGT" : "-",
      "1793 ÖVRIGT" : "Självlåsande, öppnas med nyckel",
      "0002 RITNINGSNAMN" : ""
    };

    let metaData = [];

    Object.keys(Metadata).map((key) => {
      metaData = [...metaData, {"key": key, "value": Metadata[key]}];
    });

    return metaData;
  }

// materials data for Item object
  generateMaterials() {
    let Materials = [
      {
        "name" : "Puts, gul",
        "type" : "MeshPhongMaterial",
        "ambient" : "0xE7E798",
        "color" : "0xE7E798",
        "specular" : "0xE7E798",
        "shininess" : 128,
        "emissive" : 0,
        "opacity" : 1.0,
        "transparent" : false,
        "wireframe" : false
      },
      {

        "name" : "Generell, bärande",
        "type" : "MeshPhongMaterial",
        "ambient" : "0xFFFFFF",
        "color" : "0xFFFFFF",
        "specular" : "0xFFFFFF",
        "shininess" : 128,
        "emissive" : 0,
        "opacity" : 1.0,
        "transparent" : false,
        "wireframe" : false
      },
      {
        "name" : "Partier - Generell",
        "type" : "MeshPhongMaterial",
        "ambient" : "0x999999",
        "color" : "0x999999",
        "specular" : "0x999999",
        "shininess" : (128),
        "emissive" : (0),
        "opacity" : 1.0,
        "transparent" : false,
        "wireframe" : false
      },
      {
        "name" : "Default Window Interior",
        "type" : "MeshPhongMaterial",
        "ambient" : "0xFFFFFF",
        "color" : "0xFFFFFF",
        "specular" : "0xFFFFFF",
        "shininess" : (128),
        "emissive" : (0),
        "opacity" : 1.0,
        "transparent" : false,
        "wireframe" : false
      },
      {
        "name" : "Default Hardware",
        "type" : "MeshPhongMaterial",
        "ambient" : "0x7F7F7F",
        "color" : "0x7F7F7F",
        "specular" : "0x7F7F7F",
        "shininess" : (64),
        "emissive" : (0),
        "opacity" : 1.0,
        "transparent" : false,
        "wireframe" : false
      },
      {

        "name" : "Dörr - Generell",
        "type" : "MeshPhongMaterial",
        "ambient" : "0xFFFFFF",
        "color" : "0xFFFFFF",
        "specular" : "0xFFFFFF",
        "shininess" : (128),
        "emissive" : (0),
        "opacity" : 1.0,
        "transparent" : false,
        "wireframe" : false
      },
      {

        "name" : "Tröskel - Generell",
        "type" : "MeshPhongMaterial",
        "ambient" : "0x7F7F7F",
        "color" : "0x7F7F7F",
        "specular" : "0x7F7F7F",
        "shininess" : (64),
        "emissive" : (0),
        "opacity" : 1.0,
        "transparent" : false,
        "wireframe" : false
      },
      {

        "name" : "Inredning - Generell",
        "type" : "MeshPhongMaterial",
        "ambient" : "0xFFFFFF",
        "color" : "0xFFFFFF",
        "specular" : "0xFFFFFF",
        "shininess" : (128),
        "emissive" : (0),
        "opacity" : 1.0,
        "transparent" : false,
        "wireframe" : false
      }
    ];

    return Materials;
  }
}
