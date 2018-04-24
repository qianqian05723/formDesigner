package com.wingconn.govForm.dao;

import com.wingconn.govForm.domain.TableFields;
import com.wingconn.govForm.mapper.CreateTableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-20 14:08.
 */
@Repository
public class CreateTableDAO {

    private final CreateTableMapper createTableMapper;

    @Autowired
    public CreateTableDAO(CreateTableMapper createTableMapper) {
        this.createTableMapper = createTableMapper;
    }

    /**
     * 获取当前数据库的名字
     * @return
     */
    public String getCurDBName() {
        return createTableMapper.getCurDataBaseName();
    }

    /**
     * 判断一张表是否存在指定的数据库中
     * @param tableName
     * @return
     */
    public String isTargetTableExistInDB(String tableName) {
        return createTableMapper.isTargetTableExistInDB(tableName);
    }

    /**
     * 查看一张表中记录的条数
     * @param tableName
     * @return
     */
    public int getRecordCount(String tableName) {
        return createTableMapper.getRecordCount(tableName);
    }

    /**
     * 创建一张新表
     * @param tableName
     * @param tableStatement
     */
    public void createNewTable(String tableName, String tableStatement) {
        createTableMapper.createNewTable(tableName, tableStatement);
    }

    /**
     * 查看指定表的字段
     * @param tableName
     * @return
     */
    public List<String> showFields(String tableName) {
        return createTableMapper.showFields(tableName);
    }

    /**
     * 查看指定表的字段
     * @param tableName
     * @return
     */
    public List<TableFields> showTableFields(String tableName) {
        return createTableMapper.showTableFields(tableName);
    }

    /**
     * 向指定表中插入字段
     * @param tableName
     * @param list
     * @return
     */
    public void addFields(String tableName, List<String> list) {
        createTableMapper.addField(tableName, list);
    }
}
