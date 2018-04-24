package com.wingconn.govForm.service;

import com.wingconn.govForm.dao.CreateTableDAO;
import com.wingconn.govForm.domain.FormUpdateMarkDO;
import com.wingconn.govForm.domain.TableFields;
import com.wingconn.govForm.result.Result;
import com.wingconn.govForm.util.ResultFactory;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-20 14:11.
 */
@Service
public interface CreateTableService {

    /**
     * 获取当前数据库的名字
     * @return
     */
//    public String getCurDBName() {
//        return backupDataDao.getCurDBName();
//    }

    /**
     * 判断指定的 table 是否存在 database 中
     *
     * @param databaseName 数据库名
     * @param tableName    表名
     * @return
     */
//    String isTargetTableExistInDB(String databaseName, String tableName);

    /**
     * 获取指定表中记录的条数
     * @param tableName
     * @return
     */
//    public int getRecordCount(String tableName) {
//        return backupDataDao.getRecordCount(tableName);
//    }

    /**
     * 创建一个新表
     *
     * @param tableName
     * @param tableColumns
     * @return
     */
    boolean createTable(String tableName, List<String> tableColumns);

    /**
     * 查看指定表的全部字段
     * @param tableName
     * @return
     */
//    public List<String> showFields(String tableName) {
//        return backupDataDao.showFields(tableName);
//    }

    /**
     * 查看指定表的全部字段
     * @param tableName
     * @return
     */
//    public List<TableFields> showTableFields(String tableName) {
//        return backupDataDao.showTableFields(tableName);
//    }

    /**
     * 向指定表中添加字段
     *
     * @param tableName
     * @param fields
     * @return
     */
//    Result addFields(String tableName, List<String> fields);
}
