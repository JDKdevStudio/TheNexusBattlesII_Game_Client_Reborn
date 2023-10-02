
const palabrasProhibidas: RegExp[] = [
    // Palabras prohibidas en español
    new RegExp('(hp|shakira|petro|Asesinato|asno|bastardo|Bollera|Cabrón|Caca|Chupada|Chupapollas|Chupetón' +
        '|concha|Coño|Coprofagía|Culo|Drogas|Esperma|Follador|Follar|Gilipichis|Gilipollas|Heroína' +
        '|Hijaputa|Hijoputa|Idiota|Imbécil|infierno|Jilipollas|Kapullo|Lameculos|Maciza|Macizorra' +
        '|maldito|Mamada|Marica|Maricón|Mariconazo|martillo|Mierda|Nazi|Orina|Pedo|Pendejo|Pervertido' +
        '|Pezón|Pinche|Pis|Prostituta|Puta|Racista|Ramera|Sádico|Semen|Sexo|Soplagaitas|Soplapollas' +
        '|Travesti|Trio|Verga|Vulva)', 'i'),

    // Palabras prohibidas en inglés
    new RegExp('(acrotomophilia|anilingus|anus|apeshit|arsehole|ass|asshole|assmunch|autoerotic|bangbros|bastard|bbw' +
        '|beaner|bitch|bitches|blowjob|bondage|boob|boobs|booty|butt|camgirl|clit' +
        '|cock|cum|dick|dingleberry|erotic|erotism|fingering|fucking|fuck|hot' +
        '|horny|masturbate|masturbating|nigga|nipple|orgasm|panties|playboy|porn|pornography|pussy|semen' +
        '|sex|sexcam|sexy|sexual|sexually|sexuality|shit|slut|suck|sucks|tit|tits' +
        '|titties|twinkie|undressing|vagina|worldsex)', 'i'),
];
 
export default palabrasProhibidas;

