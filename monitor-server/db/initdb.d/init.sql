CREATE DATABASE IF NOT EXISTS monitordb;

use monitordb;

CREATE TABLE IF NOT EXISTS `error` (
    `id` INT(10) AUTO_INCREMENT PRIMARY KEY,
    `errorType` VARCHAR(255) NOT NULL COMMENT '错误类型',
    `filename` VARCHAR(255) NOT NULL COMMENT '文件名称',
    `kind` VARCHAR(255) NOT NULL COMMENT '错误种类',
    `timestamp` VARCHAR(255) default now(),
    `stack` TEXT NOT NULL COMMENT '错误堆栈',
    `message` TEXT NOT NULL COMMENT '错误信息',
    `position` VARCHAR(255) NOT NULL COMMENT '位置',
    `selector` TEXT NOT NULL COMMENT '触发元素',
    `title` VARCHAR(255) COMMENT '标题',
    `type` VARCHAR(255) NOT NULL COMMENT '类型',
    `url` TEXT NOT NULL COMMENT '链接',
    `userAgent` TEXT NOT NULL COMMENT '用户信息',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = INNODB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8 COMMENT = '错误信息存储表';

CREATE TABLE IF NOT EXISTS `performance` (
    `id` INT(10) AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(255) NOT NULL  COMMENT '类型', 
    `title` VARCHAR(255) DEFAULT '' COMMENT '标题',
    `url` TEXT NOT NULL DEFAULT '' COMMENT '链接',
    `connectTime` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '连接时间',
    `ttfbTime` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '首字节到达时间',
    `kind` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '用户体验指标类型',
    `responseTime` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '响应的读取时间',
    `parseDOMTime` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'DOM解析的时间',
    `domContentLoadedTime` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'DOM加载的时间',
    `timeToInteractive` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '首次可交互时间',
    `loadTime` VARCHAR(255) DEFAULT '' COMMENT '完整的加载时间',
    `firstPaint` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'FP',
    `timestamp` VARCHAR(255) default now(),
    `firstContentfulPaint` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'FCP',
    `firstMeaningfulPaint` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'FMP',
    `largestContentfulPaint` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'LCP',
    `inputDelay` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '延时时间',
    `duration` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '处理时间',
    `startTime` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '开始时间',
    `selector` TEXT NOT NULL DEFAULT '' COMMENT '触发元素',
    `userAgent` TEXT NOT NULL DEFAULT '' COMMENT '用户信息',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = INNODB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8 COMMENT = '性能指标信息存储表';

CREATE TABLE IF NOT EXISTS `fetchIntercept` (
    `id` INT(10) AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(255) NOT NULL COMMENT '类型',
    `title` VARCHAR(255) COMMENT '标题',
    `url` TEXT NOT NULL COMMENT '链接',
    `kind` VARCHAR(255) NOT NULL COMMENT '错误种类',
    `eventType` VARCHAR(255) NOT NULL COMMENT '事件类型',
    `pathname` TEXT NOT NULL COMMENT '请求路径',
    `status` VARCHAR(255) NOT NULL COMMENT '状态码',
    `timestamp` VARCHAR(255) default now(),
    `duration` VARCHAR(255) NOT NULL COMMENT '持续时间',
    `response` TEXT NOT NULL COMMENT '响应体',
    `params` TEXT NOT NULL COMMENT '参数',
    `userAgent` TEXT NOT NULL COMMENT '用户信息',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = INNODB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8 COMMENT = '接口错误信息存储表';