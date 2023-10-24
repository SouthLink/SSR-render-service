function createErrorTable(tb = 'error') {
    return 
}

const initSqls = [
    `create table if not exists error(
        id int primary key auto_increment,
        errorType varchar(255) not null,
        filename varchar(255) not null,
        kind varchar(255) not null,
        timestamp datetime default now(),
        stack text not null,
        message text not null,
        position varchar(255) not null,
        selector text not null,
        title varchar(255) ,
        type varchar(255) not null,
        url text not null,
        userAgent not null
    ) engine=InnoDB auto_increment=0 default charset=utf8`
]

const sqls = [
    {
        name: 'error',
    }
]


module.exports = initSqls;