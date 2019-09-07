<?php

require_once(MODELS_DIR . 'BaseModel.php');


class Curso extends BaseModel
{
    private static $TABELA = "curso";

    public function get_tabela()
    {
        return self::$TABELA;
    }

    public function get_todos($order_by) : array
    {
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->order_by($order_by);
        
        $query = $this->db->get();
        return $query->result_array();
    }

    public function get_por_situacao($usuario_id, $inscrito) : array
    {   
        $cond = $inscrito ? '' : 'not';
        $query = $this->db->query('
            select * from curso c
                where c.id '.$cond.' in ( select curso_id from inscricao_dados where usuario_id = '.$usuario_id.');
        ');
        return $query->result_array();
    }

    public function get_dados_conclusao($curso_id, $usuario_id){
        $query = $this->db->query("
           SELECT 
                SUM(i.percentual) percentual_total,
            COUNT((SELECT 
                        mat.id
                    FROM
                        material mat
                    WHERE
                        mat.tipo <> 'Q' AND mat.id = m.id)) * 100 AS percentual_docs,
                COUNT((SELECT 
                        mat.id
                    FROM
                        material mat
                    WHERE
                        mat.tipo = 'Q' AND mat.id = m.id)) * 70 AS percentual_questoes
            FROM
                material m
                LEFT  JOIN
                interacao i ON m.id = i.material_id
                    JOIN
                unidade u ON u.id = m.unidade_id
                    JOIN
                curso c ON c.id = u.curso_id
                    JOIN
                inscricao_dados ind ON ind.curso_id = c.id
                    JOIN
                inscricao inc ON inc.id = ind.inscricao_id
            WHERE
                c.id = ".$curso_id." AND ind.usuario_id = ".$usuario_id );

        if (count($query->result_array()) > 0)
            return $query->result()[0];
        else
            return false;   
    }

    public function inscrever($curso_id,$usuario_id){

        $this->db->trans_start();

        $id_inscricao = parent::persiste_table(array("data"=> date("Y-m-d H:i:s")), 'inscricao');
        
        $dados_inscricao = array(
            "usuario_id" => $usuario_id,
            "curso_id" => $curso_id,
            "inscricao_id" => $id_inscricao
        );

        $id = parent::persiste_table($dados_inscricao, 'inscricao_dados');

        $this->db->trans_complete();

        return $id;
    }

    public function get_inscricao($usuario_id, $curso_id){
        $this->db->select('ins.*');
        $this->db->from('inscricao ins');
        $this->db->join('inscricao_dados insd','ins.id = insd.inscricao_id');
        $this->db->where('insd.usuario_id', $usuario_id);
        $this->db->where('insd.curso_id', $curso_id);
        
        $query = $this->db->get();
        return $query->result_array()[0];
    }

    public function get_por_id($id){
        return (object) parent::get_registro_por_id($id);
    }

    public function persistir($curso)
    {
        return  parent::persiste($curso, $this->get_tabela());
    }

    public function remover($curso)
    {
        return  parent::remove($curso['id'], 'id');
    }
}
