// Task-Z
// Shunday function yozing. Bu function sonlardan iborat array qabul qilsin. Function'ning vazifasi array tarkibidagi juft sonlarni topib ularni yig'disini qaytarsin. MASALAN: sumEvens([1, 2, 3]); return 2; sumEvens([1, 2, 3, 2]); return 4; Yuqoridagi misolda, bizning funktsiya berilayotgan array tarkibidagi sonlar ichidan faqatgina juft bo'lgan sonlarni topib, ularni hisoblab yig'indisini qaytarmoqda.
function sumEvens(arr: number[]): number {
    let newArr: number[] = [];
    let sum: number = 0;

    arr.forEach(num => {
        if(num % 2 == 0) {
            newArr.push(num)
        }
    })

    for(let num of newArr) {
        sum += num
    }

    return sum
}
const result = sumEvens([1, 2, 3, 2]);
console.log(result);


// Task-Y
// Shunday function yozing, uni 2'ta array parametri bo'lsin. Bu function ikkala arrayda ham ishtirok etgan bir xil qiymatlarni yagona arrayga joylab qaytarsin. MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3] Yuqoridagi misolda, argument sifatida berilayotgan array'larda o'xshash sonlar mavjud. Function'ning vazifasi esa ana shu ikkala array'da ishtirok etgan o'xshash sonlarni yagona arrayga joylab return qilmoqda.

/* function findIntersection(arr1: number[], arr2: number[]): number[] {
    let newArr: number[] = [];
    arr1.forEach(item1 => {
        for(let item2 of arr2) {
            if(item1 === item2) {
                newArr.push(item1)
            }
        }
    });
    return newArr;
}
const result = findIntersection([1,2,3], [3,2,0]);
console.log(result); */


// Task-X
// Shunday function yozing, uni object va string parametrlari bo'lsin. Bu function, birinchi object parametri tarkibida, kalit sifatida ikkinchi string parametri necha marotaba takrorlanganlini sanab qaytarsin. Eslatma => Nested object'lar ham sanalsin MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2 Yuqoridagi misolda, birinchi argument object, ikkinchi argument 'model'.Funktsiya, shu ikkinchi argument 'model', birinchi argument object tarkibida kalit sifatida 2 marotaba takrorlanganligi uchun 2 soni return qilmoqda

/* function countOccurrences(obj: any, key: string) {
  let count = 0;

  for (let k in obj) {
    if (k === key) count++;

    if (typeof obj[k] === "object") {
      count += countOccurrences(obj[k], key);
    }
  }

  return count;
}
const result = countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model');
console.log(result) */


// Task-W
// Shunday function yozing, u o'ziga parametr sifatida yagona array va number qabul qilsin. Siz tuzgan function arrayni numberda berilgan uzunlikda kesib bo'laklarga ajratgan holatida qaytarsin. MASALAN: chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3); return [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]; Yuqoridagi namunada berilayotgan array ikkinchi parametr 3'ga asoslanib 3 bo'lakga bo'linib qaytmoqda. Qolgani esa o'z holati qolyapti

/* function chunkArray(arr: number[], arg: number): number[][] {
    let newArr: number[][] = [];
    let tempArr: number[] = [];

    for (let i = 0; i < arr.length; i++) {
        tempArr.push(arr[i]);

        if (tempArr.length === arg) {
            newArr.push(tempArr);
            tempArr = []
        }
    }

    if (tempArr.length > 0) {
        newArr.push(tempArr);
    }

    return newArr;
}
const result = chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
console.log(result); */


// TASK V
// Shunday function yozing, uni string parametri bo'lsin. Va bu function stringdagi har bir harfni o'zi bilan necha marotaba taktorlanganligini ko'rsatuvchi object qaytarsin. MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1} Yuqoridagi misolda, 'hello' so'zi tarkibida qatnashgan harflar necha marotaba takrorlangini bilan object sifatida qaytarilmoqda.

/* function countChars(str: string): any {
    const result: { [key: string]: number } = {};
    for(let char of str) {
        if(char in result) {
            result[char]++
        } else {
            result[char] = 1
        }
    }
    return result;
}
const result = countChars("hello");
console.log(result); */

// Task-U
// Shunday function tuzing, uni number parametri bo'lsin. Va bu function berilgan parametrgacha, 0'dan boshlab oraliqda nechta toq sonlar borligini aniqlab return qilsi. MASALAN: sumOdds(9) return 4; sumOdds(11) return 5; Yuqoridagi birinchi misolda, argument sifatida, 9 berilmoqda. Va 0'dan boshlab sanaganda 9'gacha 4'ta toq son mavjud. Keyingi namunada ham xuddi shunday xolat takrorlanmoqda.
/* function sumOdds(num: number): number {
    let count: number = 0;
    for(let i = 1; i < num; i++) {
        if(i % 2 !== 0) {
            count++;
        }
    }

    return count
}
const result = sumOdds(9);
console.log(result); */


// Task-T
// Shunday function tuzing, u sonlardan tashkil topgan 2'ta array qabul qilsin. Va ikkala arraydagi sonlarni tartiblab bir arrayda qaytarsin. MASALAN: mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]); return [0, 3, 4, 4, 6, 30, 31]; Yuqoridagi misolda, ikkala arrayni birlashtirib, tartib raqam bo'yicha tartiblab qaytarmoqda.
/* function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
    return arr1.concat(arr2).sort((a, b) => a - b);
}
const result = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
console.log(result) */


// Task-S
// Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin va osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin MASALAN: missingNumber([3, 0, 1]) return 2
/* function missingNumber(arr: number[]): number {
    let arrLength: number = arr.length;
    let sum1: number = arrLength * (arrLength + 1) / 2;
    let sum2: number = 0;

    for (let num of arr) {
        sum2 += num;
    }

    return sum1 - sum2;
}

const result = missingNumber([3, 0, 1]);
console.log(result); // 2 */


// Task-R
// Shunday function yozing, u string parametrga ega bo'lsin. Agar argument sifatida berilayotgan string, "1 + 2" bo'lsa, string ichidagi sonlarin yig'indisni hisoblab, number holatida qaytarsin MASALAN: calculate("1 + 3"); return 4; 1 + 3 = 4, shu sababli 4 natijani qaytarmoqda.

/* function calculate(str: string): number {
    let nums: string[] = str.split(" ");
    const numbers: string = "1234567890";
    let total: number = 0;

    for(let i = 0; i <= nums.length; i++) {
        if(numbers.includes(nums[i])) {
            total += Number(nums[i])
        }
    }
    return total;
}
const result = calculate("1 + 3");
console.log(result); */

// Task-Q
// Shunday function yozing, u 2 ta parametrga ega bo'lib, birinchisi object, ikkinchisi string bo'lsin. Agar qabul qilinayotgan ikkinchi string, objectning biror bir propertysiga mos kelsa, 'true', aks holda mos kelmasa 'false' qaytarsin. MASALAN: hasProperty({ name: "BMW", model: "M3" }, "model"); return true; Ushbu misolda, 'model' string, objectning propertysiga mos kelganligi uchun 'true' natijani qaytarmoqda
/* function hasProperty(obj: any, str: string): boolean {
    for(let key in obj) {
        if(key == str) {
            return true
        }
    }
    return false
}
const result = hasProperty({ name: "BMW", model: "M3" }, "model");
console.log(result) */

// Task-P
// Parametr sifatida yagona object qabul qiladigan function yozing. Qabul qilingan objectni nested array sifatida convert qilib qaytarsin MASALAN: objectToArray( {a: 10, b: 20}) return [['a', 10], ['b', 20]]
/* function objectToArray(obj: any) {
    let newObj: any[] = [];
    for(let key in obj) {
        newObj.push([key, obj[key]]);
    }
    return newObj
}
const result = objectToArray({a: 10, b: 20});
console.log(result);
 */

// Task-O
// Shunday function yozing va u har xil qiymatlardan iborat array qabul qilsin. Va array ichidagi sonlar yig'indisini hisoblab chiqgan javobni qaytarsin. MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]); return 45 Yuqoridagi misolda array tarkibida faqatgina ikkita yagona son mavjud bular 10 hamda 35 Qolganlari nested bo'lib yoki type'lari number emas.

/* function calculateSumOfNumbers(arr: any[]): number {
    let result: number = 0;
    arr.forEach(item => {
        if(typeof(item) === 'number') {
            result += item
        }
    })
    return result
}
const result = calculateSumOfNumbers([10, "10", {son: 10}, true, 35]);
console.log(result) */

/* Project Standarts
    ~ Logging standarts
    ~ Naming standarts
        function, method, variable => CamelCase
        class => PascalCase
        folder, file => KebabCase
        css classes => SnakeCase
    ~ Error handling
    ~
*/

/*
    Traditional API
    Rest API
    GraphQL API
    ...
*/

/*
Traditional FD => BSSR(admin) => EJS
Modern FD => SPA(user) => REACT
*/

/*
Cookies:
    1. Har bitta request'ga yopishib oladi
    2. O'zini-o'zi destroy qila oladi
*/

/* Validitions:
    1. Frontend
    2. Pipe
    3. Backend
    4. Database
*/

// Task-N
// Shunday function yozing, u string qabul qilsin va string palindrom yani togri oqilganda ham, orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin. MASALAN: palindromCheck("dad") return true;  palindromCheck("son") return false;
/* function palindromCheck(str: string): boolean {
    const reversedStr = str.split('').reverse().join('');
    return str === reversedStr;
}
const result = palindromCheck("dad");
console.log(result); */

// Task-M
// Shunday function yozing, u raqamlardan tashkil topgan array qabul qilsin va array ichidagi har bir raqam uchun raqamni ozi va hamda osha raqamni kvadratidan tashkil topgan object hosil qilib, hosil bolgan objectlarni array ichida qaytarsin. MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}];
/* function getSquareNumbers(arr: number[]) {
    let newArr: string[] = [];

    arr.forEach(num => {
        newArr.push(`{number: ${num}, square: ${num * num}`);
    })

    return newArr
}

const result = getSquareNumbers([1, 2, 3])
console.log(result) */