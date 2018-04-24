package com.wingconn.govForm.controller;

import com.wingconn.govForm.domain.TableFields;
import com.wingconn.govForm.result.Result;
import com.wingconn.govForm.service.CreateTableService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-20 14:15.
 */
@RestController
@RequestMapping(value = "/backupData")
public class BackupDataController {
//    private static final Logger LOGGER = LoggerFactory.getLogger(BackupDataController.class);
//
//    @Autowired
//    private CreateTableService backupDataService;
//
//    /**
//     * 获取当前数据库的名字
//     * @return 当前数据库的名字
//     */
//    @RequestMapping(value = "/curDB/name", method = RequestMethod.GET)
//    public String getCurDBName() {
//        return backupDataService.getCurDBName();
//    }
//
//    /**
//     * 查看指定的表是否存在指定的数据库中
//     * @param databaseName
//     * @param tableName
//     * @return
//     */
//    @RequestMapping(value = "/tableExistInDB", method = RequestMethod.GET)
//    public String isTargetTableExistInDB(@RequestParam("databaseName") String databaseName,
//                                         @RequestParam("tableName") String tableName) {
//        return backupDataService.isTargetTableExistInDB(databaseName, tableName);
//    }
//
//    @RequestMapping(value = "/table/totalRecord/{tableName:.*}", method = RequestMethod.GET)
//    public int getRecordCount(@PathVariable("tableName") String tableName) {
//        return backupDataService.getRecordCount(tableName);
//    }
//
//    /**
//     * 创建表
//     * @param tableName
//     * @param fields
//     * @return
//     */
//    @RequestMapping(value = "/upload/fields", method = RequestMethod.POST)
//    public String createNewTable(@RequestParam(value = "tableName") String tableName,
//                                 @RequestParam(value = "fields") String fields) {
//        LOGGER.debug(fields);
//        return backupDataService.createNewTable(tableName, fields);
//    }
//
//    /**
//     * 获得指定表的全部字段
//     * @param tableName
//     * @return
//     */
//    @RequestMapping(value = "/show/string/fields", method = RequestMethod.GET)
//    public List<String> showFields(@RequestParam(value = "tableName") String tableName) {
//        return backupDataService.showFields(tableName);
//    }
//
//    /**
//     * 获得指定表的全部字段还有字段的属性
//     * @param tableName
//     * @return
//     */
//    @RequestMapping(value = "/show/map/fields", method = RequestMethod.GET)
//    public List<TableFields> showTableFields(@RequestParam(value = "tableName") String tableName) {
//        return backupDataService.showTableFields(tableName);
//    }
//
//    /**
//     * 向表中加人新列
//     * @param tableName
//     * @param fields
//     * @return
//     */
//    @RequestMapping(value = "/add/table/column", method = RequestMethod.POST)
//    public Result andTableField(@RequestParam(value = "tableName") String tableName,
//                                @RequestParam(value = "fields") List<String> fields) {
//        return backupDataService.addFields(tableName, fields);
//    }
}
